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

  const [insertedResource] = await db
    .insert(schema.resources)
    .values({
      id: crypto.randomUUID(),
      title: body.title,
      markdown: body.markdown,
    })
    .returning({ id: schema.resources.id });

  return c.json(null, 200, {
    "HX-Redirect": `/manage/resources/${insertedResource.id}`,
  });
});

api.put("/:id", async (c) => {
  const db = getDb(c.env.DB);

  const resourceId = c.req.param("id");

  const formData = await c.req.formData();
  const body = Object.fromEntries(formData.entries()) as {
    title: string;
    markdown: string;
  };

  const result = await db
    .update(schema.resources)
    .set({
      title: body.title,
      markdown: body.markdown,
    })
    .where(eq(schema.resources.id, resourceId))
    .returning({ id: schema.resources.id });

  if (result.length === 0) {
    return c.json({ error: "Resource not found" }, 404);
  }

  return c.json({ id: resourceId }, 200);
});

export default api;
