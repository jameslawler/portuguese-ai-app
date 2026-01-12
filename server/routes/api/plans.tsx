import { Hono } from "hono";
import { eq } from "drizzle-orm";

import { getDb } from "../../db";
import * as schema from "../../db/schema";

const api = new Hono<{ Bindings: CloudflareBindings }>();

api.get("/:id", async (c) => {
  const db = getDb(c.env.DB);

  const planId = c.req.param("id");

  const plan = await db
    .select()
    .from(schema.plans)
    .where(eq(schema.plans.id, planId))
    .get();

  if (!plan) {
    return c.json({ error: "Plan not found" }, 404);
  }

  return c.json(plan);
});

api.post("/", async (c) => {
  const db = getDb(c.env.DB);

  const formData = await c.req.formData();
  const body = Object.fromEntries(formData.entries()) as {
    name: string;
    nodes: string;
  };

  const [insertedPlan] = await db
    .insert(schema.plans)
    .values({
      id: crypto.randomUUID(),
      name: body.name,
      nodes: body.nodes,
    })
    .returning({ id: schema.plans.id });

  return c.json(null, 200, {
      "HX-Redirect": `/editor/edit/${insertedPlan.id}`,
    });
});

api.put("/:id", async (c) => {
  const db = getDb(c.env.DB);

  const planId = c.req.param("id");

  const formData = await c.req.formData();
  const body = Object.fromEntries(formData.entries()) as {
    name: string;
    nodes: string;
  };

  const result = await db
    .update(schema.plans)
    .set({
      name: body.name,
      nodes: body.nodes,
    })
    .where(eq(schema.plans.id, planId))
    .returning({ id: schema.plans.id });

  if (result.length === 0) {
    return c.json({ error: "Plan not found" }, 404);
  }

  return c.json({ id: planId }, 200);
});

export default api;
