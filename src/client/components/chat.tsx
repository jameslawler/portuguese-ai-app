import type { FC } from "hono/jsx";
import { marked } from "marked";

import { Message } from "../../types/message";

const Chat: FC<{
  messages: Message[];
}> = async (props: { messages: Message[] }) => {
  const markdownMessages = await Promise.all(
    props.messages.map(async (message) => {
      const html = await marked(message.content);
      return {
        role: message.role,
        content: html,
      };
    })
  );

  return (
    <div class="flex flex-col ">
      <div id="chat-stream">
        {markdownMessages.map((message) => (
          <div
            class={`${
              message.role === "user"
                ? "prose text-red-700"
                : "prose text-gray-700"
            }`}
            dangerouslySetInnerHTML={{ __html: message.content }}
          ></div>
        ))}
      </div>
      <div class="border-t px-3 py-2">
        <form
          hx-post="/api/v1/ai/chat"
          hx-trigger="submit"
          hx-target="#chat-stream"
          hx-swap="beforeend"
          class="flex gap-2 border-t p-2"
        >
          <input
            {...{ "x-bind:value": "contextType" }}
            type="hidden"
            name="contextType"
          />
          <input
            {...{ "x-bind:value": "contextId" }}
            type="hidden"
            name="contextId"
          />
          <input
            type="text"
            name="message"
            required
            placeholder="Ask something…"
            class="flex-1 border rounded px-3 py-2 text-sm"
          />
          <button
            type="submit"
            class="px-4 py-2 text-sm bg-blue-600 text-white rounded"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
