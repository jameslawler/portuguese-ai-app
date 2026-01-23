import { Hono } from "hono";

import { getDb } from "../../db";
import { createPlan, updatePlan } from "../../db/repositories/plans";

const api = new Hono<{ Bindings: CloudflareBindings }>();

api.post("/", async (c) => {
  const db = getDb(c.env.DB);

  const formData = await c.req.formData();
  const body = Object.fromEntries(formData.entries()) as {
    name: string;
    nodes: string;
  };

  const [inserted] = await createPlan(db, {
    name: body.name,
    nodes: body.nodes,
    isHomePlan: false,
  });

  return c.json(null, 200, {
    "HX-Redirect": `/manage/plans/${inserted.id}`,
  });
});

api.put("/:id", async (c) => {
  const db = getDb(c.env.DB);

  const planId = c.req.param("id");

  const formData = await c.req.formData();
  const body = Object.fromEntries(formData.entries()) as {
    name: string;
    nodes: string;
    isHomePlan: string;
  };

  const result = await updatePlan(db, {
    id: planId,
    name: body.name,
    nodes: body.nodes,
    isHomePlan: body.isHomePlan === "on",
  });

  if (result.length === 0) {
    return c.json({ error: "Plan not found" }, 404);
  }

  return c.json({ id: planId }, 200);
});

export default api;
