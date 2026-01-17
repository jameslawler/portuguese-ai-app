import { Hono } from "hono";
import { eq } from "drizzle-orm";

import { getDb } from "../../db";
import * as schema from "../../db/schema";

const api = new Hono<{ Bindings: CloudflareBindings }>();

api.post("/", async (c) => {
  const db = getDb(c.env.DB);

  const formData = await c.req.formData();
  const body = Object.fromEntries(formData.entries()) as {
    title: string;
    markdown: string;
  };

  const [inserted] = await db
    .insert(schema.lessons)
    .values({
      id: crypto.randomUUID(),
      title: body.title,
      markdown: body.markdown,
    })
    .returning({ id: schema.lessons.id });

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

  const result = await db
    .update(schema.lessons)
    .set({
      title: body.title,
      markdown: body.markdown,
    })
    .where(eq(schema.lessons.id, lessonId))
    .returning({ id: schema.lessons.id });

  if (result.length === 0) {
    return c.json({ error: "Lesson not found" }, 404);
  }

  return c.json({ id: lessonId }, 200);
});

export default api;
