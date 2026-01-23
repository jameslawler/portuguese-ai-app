import { Hono } from "hono";

import { getDb } from "../../db";
import { createLesson, updateLesson } from "../../db/repositories/lessons";

const api = new Hono<{ Bindings: CloudflareBindings }>();

api.post("/", async (c) => {
  const db = getDb(c.env.DB);

  const formData = await c.req.formData();
  const body = Object.fromEntries(formData.entries()) as {
    title: string;
    markdown: string;
  };

  const [inserted] = await createLesson(db, {
    title: body.title,
    markdown: body.markdown,
  });

  return c.json(null, 200, {
    "HX-Redirect": `/manage/lessons/${inserted.id}`,
  });
});

api.put("/:id", async (c) => {
  const db = getDb(c.env.DB);

  const lessonId = c.req.param("id");

  const formData = await c.req.formData();
  const body = Object.fromEntries(formData.entries()) as {
    title: string;
    markdown: string;
  };

  const result = await updateLesson(db, {
    id: lessonId,
    title: body.title,
    markdown: body.markdown,
  });

  if (result.length === 0) {
    return c.json({ error: "Lesson not found" }, 404);
  }

  return c.json({ id: lessonId }, 200);
});

export default api;
