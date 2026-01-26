import type { FC } from "hono/jsx";
import LessonModal from "./modal-lesson";
import { Lesson } from "../../types/lesson";
import { User } from "../../types/auth";
import { Message } from "../../types/message";
import Chat from "./chat";

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
      x-data={`{ activeTab: '${defaultTab}', chatOpen: false, contextType: 'lesson', contextId: '${props.lessonId}' }`}
      class="flex flex-col h-full"
    >
      <div class="border-b border-gray-200">
        <nav class="flex gap-6 px-4" aria-label="Tabs">
          <button
            {...{
              ":class": `activeTab === 'learn' ? "${selectedTabClass}" : "${unselectedTabClass}"`,
              "@click": `activeTab = 'learn';contextType='lesson';contextId='${props.lessonId}'`,
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
              "@click": `activeTab = 'resources';contextType='resources';contextId='${props.resourceId}'`,
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
        >
          <Chat messages={props.messages} />
        </div>
      </section>
    </div>
  );
};

export default Modal;
