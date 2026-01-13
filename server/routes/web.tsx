import { Hono } from "hono";
import { eq } from "drizzle-orm";

import { AuthUser, AuthSession } from "../auth";
import { getDb } from "../db";
import * as schema from "../db/schema";
import HomePage from "../../client/pages/home-page";
import SignupPage from "../../client/pages/signup-page";
import SigninPage from "../../client/pages/signin-page";
import BuilderPage from "../../client/pages/builder-page";
import BuilderListPage from "../../client/pages/builder-list-page";
import PlanPage from "../../client/pages/plan-page";

const web = new Hono<{
  Bindings: CloudflareBindings;
  Variables: {
    user: AuthUser | null;
    session: AuthSession | null;
  };
}>();

web.get("/", async (c) => {
  const user = c.get("user");

  return c.html(<HomePage userName={user?.name} />);
});

web.get("/signup", (c) => {
  return c.html(<SignupPage />);
});

web.get("/signin", (c) => {
  return c.html(<SigninPage />);
});

web.get("/editor", async (c) => {
  const user = c.get("user");

  if (!user) {
    return c.body(null, 401);
  }

  const db = getDb(c.env.DB);

  const plans = await db
    .select()
    .from(schema.plans)
    .all();

  return c.html(<BuilderListPage plans={plans} />);
});

web.get("/editor/edit/:id", async (c) => {
  const user = c.get("user");

  if (!user) {
    return c.body(null, 401);
  }

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

  return c.html(<BuilderPage plan={plan} />);
});

web.get("/plans/:id", async (c) => {
  const user = c.get("user");

  if (!user) {
    return c.body(null, 401);
  }

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

  return c.html(<PlanPage plan={plan} />);
});

export default web;
