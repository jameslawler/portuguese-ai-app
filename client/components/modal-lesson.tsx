import type { FC } from "hono/jsx";
import { marked } from "marked";

import { User } from "../../types/auth";
import { Lesson } from "../../types/lesson";

const LessonModal: FC<{ user: User; lesson: Lesson }> = async (props: {
  user: User;
  lesson: Lesson;
}) => {
  const html = await marked(props.lesson.markdown);

  return (
    <div class="flex flex-col">
      <div class="text-3xl font-bold mb-4">{props.lesson.title}</div>
      <div
        class="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};

export default LessonModal;
