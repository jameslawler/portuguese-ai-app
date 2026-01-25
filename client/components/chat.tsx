import type { FC } from "hono/jsx";
import { Message } from "../../types/message";

const Chat: FC<{
  messages: Message[];
}> = async (props: { messages: Message[] }) => {
  return (
    <div class="flex flex-col ">
      <div id="chat-stream">
        {props.messages.map((message) => (
          <div
            class={`${
              message.role === "user" ? "text-red-700" : "text-gray-700"
            }`}
          >
            {message.content}
          </div>
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
