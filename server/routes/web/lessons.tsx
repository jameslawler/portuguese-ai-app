import { Hono } from "hono";

import { AuthUser, AuthSession } from "../../auth";
import { getDb } from "../../db";
import { getLesson } from "../../db/repositories/lessons";
import LessonModal from "../../../client/components/modal-lesson";

const api = new Hono<{
  Bindings: CloudflareBindings;
  Variables: {
    user: AuthUser | null;
    session: AuthSession | null;
  };
}>();

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

  return c.html(<LessonModal user={userStatus} lesson={lesson} />);
});

export default api;
