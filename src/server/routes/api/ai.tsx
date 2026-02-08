import { Hono } from "hono";
import { OpenAI } from "openai";
import { getDb } from "../../db";
import { createMessage, getMessage } from "../../db/repositories/messages";
import { AuthSession, AuthUser } from "../../auth";
import { getLesson } from "../../db/repositories/lessons";
import Exercises from "../../../client/components/exercises";
import {
  createScenarioMessage,
  getScenarioMessage,
} from "../../db/repositories/scenario-messages";
import { getScenarioSession } from "../../db/repositories/scenario-sessions";

const api = new Hono<{
  Bindings: CloudflareBindings;
  Variables: {
    user: AuthUser | null;
    session: AuthSession | null;
  };
}>();

api.post("/chat", async (c) => {
  const user = c.get("user");
  const db = getDb(c.env.DB);

  if (!user || !user.id) {
    return c.body(null, 401);
  }

  const formData = await c.req.formData();
  const body = Object.fromEntries(formData.entries()) as {
    message: string;
    contextType: string;
    contextId: string;
  };

  const [message] = await createMessage(db, {
    userId: user.id,
    role: "user",
    content: body.message,
  });

  return c.html(`
    <div class="text-red-700">${body.message}</div>
    <div
      hx-ext="sse"
      sse-connect="/api/v1/ai/chat/${message.id}?contextType=${body.contextType}&contextId=${body.contextId}"
      sse-close="done"
      sse-swap="message"
      hx-swap="beforeend"
      class="text-gray-700">
    </div>
  `);
});

api.get("/chat/:messageId", async (c) => {
  const user = c.get("user");
  const messageId = c.req.param("messageId");
  const contextType = c.req.query()["contextType"];
  const contextId = c.req.query()["contextId"];

  const db = getDb(c.env.DB);

  if (!user || !user.id) {
    return c.body(null, 401);
  }

  const message = await getMessage(db, messageId);

  if (message?.userId !== user.id) {
    return c.body(null, 401);
  }

  let customContext = "";

  if (contextType === "lesson") {
    const lesson = await getLesson(db, contextId);

    if (lesson) {
      console.log("lesson is", lesson.id);
      const headlines = [...lesson.markdown.matchAll(/^#+\s+(.*)$/gm)].map(
        (match) => match[1]
      );

      customContext = headlines.map((h) => `* ${h}`).join("\n");
    }
  }

  const client = new OpenAI({
    apiKey: c.env.AI_API_KEY,
  });

  const stream = await client.responses.create({
    model: "gpt-5-nano",
    stream: true,
    reasoning: { effort: "minimal" },
    input: [
      {
        role: "system",
        content: [
          {
            type: "input_text",
            text: `
You are an expert in Portugal and the Portuguese language. Keep answers concise and under 50 words if possible. Use the context below if context is not clear.

## Context

* Portugal
${customContext}
  
## Rules

- Reply in English as the teaching language but keep the context relevant to Portugal and the Portuguese language.
- The reply can contain Portuguese words when necessary for teaching.
- Keep the answer relevant to the question.
- Keep the answer factual.
`,
          },
        ],
      },
      {
        role: "user",
        content: [{ type: "input_text", text: message.content }],
      },
    ],
  });

  const encoder = new TextEncoder();
  let streamMessage = "";

  return new Response(
    new ReadableStream({
      async start(controller) {
        for await (const event of stream) {
          if (event.type === "response.output_text.delta") {
            controller.enqueue(
              encoder.encode(`event: message\ndata: ${event.delta}\n\n`)
            );
            streamMessage += event.delta;
          }

          if (event.type === "response.completed") {
            controller.enqueue(encoder.encode("event: done\ndata:\n\n"));
            controller.close();

            await createMessage(db, {
              userId: user.id,
              role: "assistant",
              content: streamMessage,
            });
          }
        }
      },
    }),
    {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
      },
    }
  );
});

api.get("/exercises", async (c) => {
  const user = c.get("user");

  if (!user || !user.id) {
    return c.body(null, 401);
  }

  const client = new OpenAI({
    apiKey: c.env.AI_API_KEY,
  });

  const response = await client.responses.create({
    model: "gpt-5-nano",
    reasoning: { effort: "minimal" },
    input: [
      {
        role: "system",
        content: [
          {
            type: "input_text",
            text: `
You are a quiz generator.

Generate multiple-choice questions about Portugal.
Questions should be factual, clear, and suitable for general knowledge.
Each question must have exactly one correct answer.
Do not include explanations, commentary, or extra text.
Only generate data that matches the provided JSON schema.
`,
          },
        ],
      },
      {
        role: "user",
        content: [
          { type: "input_text", text: "Generate 5 multiple-choice questions." },
        ],
      },
    ],
    text: {
      format: {
        type: "json_schema",
        name: "portugal_quiz",
        schema: {
          type: "object",
          additionalProperties: false,
          properties: {
            questions: {
              type: "array",
              minItems: 1,
              items: {
                type: "object",
                additionalProperties: false,
                properties: {
                  questionText: {
                    type: "string",
                    minLength: 1,
                  },
                  answers: {
                    type: "array",
                    minItems: 2,
                    items: {
                      type: "object",
                      additionalProperties: false,
                      properties: {
                        answerText: {
                          type: "string",
                          minLength: 1,
                        },
                        isCorrect: {
                          type: "boolean",
                        },
                      },
                      required: ["answerText", "isCorrect"],
                    },
                  },
                },
                required: ["questionText", "answers"],
              },
            },
          },
          required: ["questions"],
        },
        strict: true,
      },
    },
  });

  const outputText = response.output_text?.trim();
  const exercises = JSON.parse(outputText);

  return c.html(<Exercises questions={exercises.questions} />);
});

api.post("/scenarios/:sessionId", async (c) => {
  const user = c.get("user");
  const sessionId = c.req.param("sessionId");
  const db = getDb(c.env.DB);

  if (!user || !user.id) {
    return c.body(null, 401);
  }

  const formData = await c.req.formData();
  const body = Object.fromEntries(formData.entries()) as {
    message: string;
  };

  const [message] = await createScenarioMessage(db, {
    userId: user.id,
    sessionId,
    role: "user",
    content: body.message,
  });

  return c.html(`
    <div class="text-red-700">${body.message}</div>
    <div
      hx-ext="sse"
      sse-connect="/api/v1/ai/scenarios/${sessionId}/messages/${message.id}"
      sse-close="done"
      sse-swap="message"
      hx-swap="beforeend"
      class="text-gray-700">
    </div>
    <button
      hx-get=${`/api/v1/ai/scenarios/${sessionId}/messages/${message.id}/notes`}
      hx-trigger="click"
    >
      Get Notes
    </button>
  `);
});

api.get("/scenarios/:sessionId/messages/:messageId", async (c) => {
  const user = c.get("user");
  const sessionId = c.req.param("sessionId");
  const messageId = c.req.param("messageId");

  const db = getDb(c.env.DB);

  if (!user || !user.id) {
    return c.body(null, 401);
  }

  const session = await getScenarioSession(db, sessionId);
  const message = await getScenarioMessage(db, messageId);

  if (message?.userId !== user.id) {
    return c.body(null, 401);
  }

  const client = new OpenAI({
    apiKey: c.env.AI_API_KEY,
  });

  const stream = await client.responses.create({
    model: "gpt-5-nano",
    stream: true,
    reasoning: { effort: "minimal" },
    input: [
      {
        role: "system",
        content: [
          {
            type: "input_text",
            text: `
You are simulating a real-life conversation for learning European Portuguese.

Scenario:
- Location: Lisbon
- Situation: Buying a bus ticket
- Your role: Bus driver
- The user's role: Passenger
- Goal: The passenger wants to buy a ticket to the city center.

Rules:
- Speak ONLY as the bus driver.
- Use natural European Portuguese.
- Keep replies short (1-2 sentences).
- Do NOT explain grammar or vocabulary unless the user asks.
- If the user makes a mistake, respond naturally but correctly.
- If the user is unclear, ask a realistic follow-up question.
- Never break character.
`,
          },
        ],
      },
      {
        role: "system",
        content: [
          { type: "input_text", text: "Start the conversation naturally." },
        ],
      },
    ],
  });

  const encoder = new TextEncoder();
  let streamMessage = "";

  return new Response(
    new ReadableStream({
      async start(controller) {
        for await (const event of stream) {
          if (event.type === "response.output_text.delta") {
            controller.enqueue(
              encoder.encode(`event: message\ndata: ${event.delta}\n\n`)
            );
            streamMessage += event.delta;
          }

          if (event.type === "response.completed") {
            controller.enqueue(encoder.encode("event: done\ndata:\n\n"));
            controller.close();

            await createScenarioMessage(db, {
              userId: user.id,
              sessionId,
              role: "assistant",
              content: streamMessage,
            });
          }
        }
      },
    }),
    {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
      },
    }
  );
});

api.get("/scenarios/:sessionId/messages/:messageId/notes", async (c) => {
  const user = c.get("user");
  const sessionId = c.req.param("sessionId");
  const messageId = c.req.param("messageId");

  const db = getDb(c.env.DB);

  if (!user || !user.id) {
    return c.body(null, 401);
  }

  const session = await getScenarioSession(db, sessionId);
  const message = await getScenarioMessage(db, messageId);

  if (message?.userId !== user.id) {
    return c.body(null, 401);
  }

  const client = new OpenAI({
    apiKey: c.env.AI_API_KEY,
  });

  const response = await client.responses.create({
    model: "gpt-5-nano",
    reasoning: { effort: "minimal" },
    input: [
      {
        role: "system",
        content: [
          {
            type: "input_text",
            text: `
You are a Portuguese language teacher evaluating a student's message.

Your tasks:
1. Identify which communicative intents are expressed in the message.
2. Provide corrections to the student's Portuguese from a teacher's perspective.

Rules:
- Focus on European Portuguese.
- Only identify intents from the allowed list.
- Do not infer intents that are not clearly expressed.
- Do not roleplay or continue the scenario.
- Be concise and factual.
- Corrections must be explained in English.
- If no correction is needed, return an empty corrections array.
- Output must strictly conform to the provided JSON schema.
`,
          },
        ],
      },
      {
        role: "user",
        content: [{ type: "input_text", text: "Quero uma bilhete." }],
      },
    ],
    text: {
      format: {
        type: "json_schema",
        name: "teacher_evaluation",
        schema: {
          type: "object",
          additionalProperties: false,
          properties: {
            intents: {
              type: "array",
              description:
                "Communicative intents identified in the student's message",
              minItems: 0,
              items: {
                type: "string",
                enum: [
                  "greeting",
                  "give_destination",
                  "ask_price",
                  "buy_ticket",
                  "thank",
                ],
              },
            },
            corrections: {
              type: "array",
              description: "Teacher corrections to the student's message",
              minItems: 0,
              items: {
                type: "object",
                additionalProperties: false,
                properties: {
                  original_text: {
                    type: "string",
                    minLength: 1,
                  },
                  corrected_text: {
                    type: "string",
                    minLength: 1,
                  },
                  reason: {
                    type: "string",
                    minLength: 1,
                  },
                },
                required: ["original_text", "corrected_text", "reason"],
              },
            },
          },
          required: ["intents", "corrections"],
        },
        strict: true,
      },
    },
  });

  return c.body(null, 200);
});

export default api;
