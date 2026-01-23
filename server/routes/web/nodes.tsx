import { Hono } from "hono";

import { AuthUser, AuthSession } from "../../auth";
import { getDb } from "../../db";
import Modal from "../../../client/components/modal";
import { getLesson } from "../../db/repositories/lessons";
import { getUserMessages } from "../../db/repositories/messages";

const api = new Hono<{
  Bindings: CloudflareBindings;
  Variables: {
    user: AuthUser | null;
    session: AuthSession | null;
  };
}>();

type RequestBody = {
  resourceId: string;
  lessonId: string;
};

api.post("/", async (c) => {
  const user = c.get("user");

  if (!user) {
    return c.body(null, 401);
  }

  const body = (await c.req.parseBody()) as RequestBody;

  const db = getDb(c.env.DB);
  const userStatus = { isLoggedIn: !!user };
  const lesson = await getLesson(db, body.lessonId);
  const messages = await getUserMessages(db, user.id);

  console.log(user.id);
  console.log(messages.length);

  if (!lesson) {
    return c.json({ error: "Lesson not found" }, 404);
  }

  return c.html(
    <Modal
      user={userStatus}
      lesson={lesson}
      resourceId={body.resourceId}
      lessonId={body.lessonId}
      messages={messages.reverse()}
    />
  );
});

export default api;
