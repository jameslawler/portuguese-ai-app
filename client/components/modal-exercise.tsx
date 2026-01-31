import type { FC } from "hono/jsx";

import { User } from "../../types/auth";
import { Lesson } from "../../types/lesson";

const ExerciseModal: FC<{ user: User; lesson: Lesson }> = async (props: {
  user: User;
  lesson: Lesson;
}) => {
  return (
    <div class="flex flex-col">
      <div class="text-3xl font-bold mb-4">{props.lesson.title}</div>
      <button
        hx-get={`/api/v1/ai/exercises`}
        hx-target="#exercises"
        hx-trigger="click"
      >
        Start
      </button>
      <div id="exercises">Hello</div>
    </div>
  );
};

export default ExerciseModal;
