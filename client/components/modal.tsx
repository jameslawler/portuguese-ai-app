import type { FC } from "hono/jsx";
import LessonModal from "./modal-lesson";
import { Lesson } from "../../types/lesson";
import { User } from "../../types/auth";
import { Message } from "../../types/message";

export type ModalTab = "learn" | "resources";

const Modal: FC<{
  user: User;
  lesson: Lesson;
  resourceId: string;
  lessonId: string;
  messages: Message[];
}> = async (props: {
  user: User;
  lesson: Lesson;
  resourceId: string;
  lessonId: string;
  messages: Message[];
}) => {
  const defaultTab = "learn";
  const selectedTabClass =
    "py-3 px-1 border-b-2 border-blue-600 text-blue-600 font-medium text-sm hover:cursor-pointer";
  const unselectedTabClass =
    "py-3 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium text-sm hover:cursor-pointer";

  return (
    <div
      x-data={`{ activeTab: '${defaultTab}', chatOpen: false }`}
      class="flex flex-col h-full"
    >
      <div class="border-b border-gray-200">
        <nav class="flex gap-6 px-4" aria-label="Tabs">
          <button
            {...{
              ":class": `activeTab === 'learn' ? "${selectedTabClass}" : "${unselectedTabClass}"`,
              "@click": "activeTab = 'learn'",
            }}
            hx-get={`/lessons/${props.lessonId}`}
            hx-target="#modal-tab-content"
            hx-trigger="click"
          >
            Learn
          </button>
          <button
            {...{
              ":class": `activeTab === 'resources' ? "${selectedTabClass}" : "${unselectedTabClass}"`,
              "@click": "activeTab = 'resources'",
            }}
            hx-get={`/resources/${props.resourceId}`}
            hx-target="#modal-tab-content"
            hx-trigger="click"
          >
            Resources
          </button>
        </nav>
      </div>
      <div id="modal-tab-content" class="flex-1 mt-4">
        <LessonModal user={props.user} lesson={props.lesson} />
      </div>
      <section
        {...{
          ":class": `chatOpen ? 'h-64' : 'h-12'`,
        }}
        class="mt-auto border-t border-gray-200 bg-white transition-all duration-300"
      >
        <button
          {...{
            "@click": "chatOpen = !chatOpen",
          }}
          class="flex items-center justify-between w-full h-12 px-4 text-sm font-medium"
        >
          <span>AI Chat</span>
          <svg
            {...{
              ":class": `chatOpen && 'rotate-180'`,
            }}
            class="w-4 h-4 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        <div
          {...{
            ":class": `chatOpen ? 'h-[calc(100%-3rem)]' : 'hidden'`,
          }}
          x-transition
        >
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
        </div>
      </section>
    </div>
  );
};

export default Modal;
