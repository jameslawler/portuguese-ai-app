import { Hono } from "hono";

import { AuthUser, AuthSession } from "../../auth";
import { getDb } from "../../db";
import { getLesson } from "../../db/repositories/lessons";
import ExerciseModal from "../../../client/components/modal-exercise";

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

  return c.html(<ExerciseModal user={userStatus} lesson={lesson} />);
});

export default api;
