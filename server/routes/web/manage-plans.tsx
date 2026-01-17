import { Hono } from "hono";

import { AuthUser, AuthSession } from "../../auth";
import { getDb } from "../../db";
import ManagePlan from "../../../client/pages/manage-plan-page";
import ManagePlans from "../../../client/pages/manage-plans-page";
import { getPlan, getPlans } from "../../db/repositories/plans";

const api = new Hono<{
  Bindings: CloudflareBindings;
  Variables: {
    user: AuthUser | null;
    session: AuthSession | null;
  };
}>();

api.get("/", async (c) => {
  const user = c.get("user");

  if (!user) {
    return c.body(null, 401);
  }

  const db = getDb(c.env.DB);
  const userStatus = { isLoggedIn: !!user };
  const plans = await getPlans(db);

  return c.html(<ManagePlans user={userStatus} plans={plans} />);
});

api.get("/:id", async (c) => {
  const user = c.get("user");

  if (!user) {
    return c.body(null, 401);
  }

  const db = getDb(c.env.DB);
  const userStatus = { isLoggedIn: !!user };
  const planId = c.req.param("id");
  const plan = await getPlan(db, planId);

  if (!plan) {
    return c.json({ error: "Plan not found" }, 404);
  }

  return c.html(<ManagePlan user={userStatus} plan={plan} />);
});

export default api;
