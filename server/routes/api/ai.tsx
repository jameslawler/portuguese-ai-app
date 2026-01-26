import { Hono } from "hono";
import { OpenAI } from "openai";
import { getDb } from "../../db";
import { createMessage, getMessage } from "../../db/repositories/messages";
import { AuthSession, AuthUser } from "../../auth";
import { getLesson } from "../../db/repositories/lessons";

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

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

api.get("/chat/:messageId/fake", async (c) => {
  const user = c.get("user");
  const messageId = c.req.param("messageId");
  const db = getDb(c.env.DB);

  if (!user || !user.id) {
    return c.body(null, 401);
  }

  const message = await getMessage(db, messageId);

  if (message?.userId !== user.id) {
    return c.body(null, 401);
  }

  await createMessage(db, {
    userId: user.id,
    role: "assistant",
    content: message.content,
  });

  const encoder = new TextEncoder();

  return new Response(
    new ReadableStream({
      async start(controller) {
        for await (const word of message.content.split(" ")) {
          controller.enqueue(
            encoder.encode(`event: message\ndata: ${word}\n\n`)
          );
          await delay(400);
        }
        controller.enqueue(encoder.encode("event: done\ndata:\n\n"));
        controller.close();
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

* Reply in English as the teaching language but keep the context relevant to Portugal and the Portuguese language.
* The reply can contain Portuguese words when necessary for teaching.
* Keep the answer relevant to the question.
* Keep the answer factual.
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

export default api;
