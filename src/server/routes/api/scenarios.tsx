import { Hono } from "hono";

import { getDb } from "../../db";
import * as schema from "../../db/schema";
import { AuthSession, AuthUser } from "../../auth";

const api = new Hono<{
  Bindings: CloudflareBindings;
  Variables: {
    user: AuthUser | null;
    session: AuthSession | null;
  };
}>();

api.post("/sessions", async (c) => {
  const user = c.get("user");
  const db = getDb(c.env.DB);

  if (!user || !user.id) {
    return c.body(null, 401);
  }

  const formData = await c.req.formData();
  const body = Object.fromEntries(formData.entries()) as {
    type: string;
  };

  const [inserted] = await db
    .insert(schema.scenarioSessions)
    .values({
      id: crypto.randomUUID(),
      userId: user.id,
      type: body.type,
      configuration: "",
      objectives: "",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })
    .returning({ id: schema.scenarioSessions.id });

  return c.json(null, 201);
});

export default api;
