import type { FC } from "hono/jsx";

import Layout from "../components/layout";
import { User } from "../../types/auth";
import Navbar from "../components/navbar";
import { Lesson } from "../../types/lesson";

const ManageLessonsPage: FC<{ user: User; lessons: Lesson[] }> = (props: {
  user: User;
  lessons: Lesson[];
}) => {
  return (
    <Layout>
      <Navbar user={props.user} />
      <div class="flex h-full justify-center">
        <main class="container">
          <form hx-post="/api/v1/lessons">
            <input type="text" name="title" value="My lesson" />
            <input type="hidden" name="markdown" value="Fill me" />
            <button
              type="submit"
              class="mb-4 rounded bg-blue-600 px-4 py-2 text-white hover:cursor-pointer"
            >
              New Lesson
            </button>
          </form>
          <h1 class="text-2xl font-semibold mb-6">Lessons</h1>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {props.lessons.map((lesson) => (
              <a
                href={`/manage/lessons/${lesson.id}`}
                class="block rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200 hover:shadow-md hover:ring-blue-500 transition"
              >
                <h2 class="text-lg font-medium text-gray-900">
                  {lesson.title ?? "Untitled Lesson"}
                </h2>
              </a>
            ))}
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default ManageLessonsPage;
