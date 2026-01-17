import type { FC } from "hono/jsx";
import LessonModal from "./modal-lesson";
import { Lesson } from "../../types/lesson";
import { User } from "../../types/auth";

export type ModalTab = "learn" | "resources";

const Modal: FC<{
  user: User;
  lesson: Lesson;
  resourceId: string;
  lessonId: string;
}> = async (props: {
  user: User;
  lesson: Lesson;
  resourceId: string;
  lessonId: string;
}) => {
  const defaultTab = "learn";
  const selectedTabClass =
    "py-3 px-1 border-b-2 border-blue-600 text-blue-600 font-medium text-sm";
  const unselectedTabClass =
    "py-3 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium text-sm";

  return (
    <div x-data={`{ activeTab: '${defaultTab}' }`} class="flex flex-col">
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
      <div id="modal-tab-content" class="mt-4">
        <LessonModal user={props.user} lesson={props.lesson} />
      </div>
    </div>
  );
};

export default Modal;
