import { Hono } from "hono";

import { AuthUser, AuthSession } from "../../auth";
import { getDb } from "../../db";
import { getLessons, getLesson } from "../../db/repositories/lessons";
import ManageLessonPage from "../../../client/pages/manage-lesson-page";
import ManageLessonsPage from "../../../client/pages/manage-lessons-page";

const api = new Hono<{
  Bindings: CloudflareBindings;
  Variables: {
    user: AuthUser | null;
    session: AuthSession | null;
  };
}>();

api.get("/", async (c) => {
  const user = c.get("user");

  if (!user) {
    return c.body(null, 401);
  }

  const db = getDb(c.env.DB);
  const userStatus = { isLoggedIn: !!user };
  const lessons = await getLessons(db);

  return c.html(<ManageLessonsPage user={userStatus} lessons={lessons} />);
});

api.get("/:id", async (c) => {
  const user = c.get("user");

  if (!user) {
    return c.body(null, 401);
  }

  const db = getDb(c.env.DB);
  const userStatus = { isLoggedIn: !!user };
  const lessonId = c.req.param("id");
  const lesson = await getLesson(db, lessonId);

  if (!lesson) {
    return c.json({ error: "Lesson not found" }, 404);
  }

  return c.html(<ManageLessonPage user={userStatus} lesson={lesson} />);
});

export default api;
