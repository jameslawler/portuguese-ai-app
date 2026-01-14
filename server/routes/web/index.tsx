import { Hono } from "hono";

import { AuthUser, AuthSession } from "../../auth";
import HomePage from "../../../client/pages/home-page";
import account from "./account";
import manage from "./manage";
import plans from "./plans";
import { getDb } from "../../db";
import { getPlan } from "../../db/repositories/plan";
import HomePageError from "../../../client/pages/home-page-error";

const homePlanId = "c656590e-6ed5-4030-bfff-4f5d1e2cc993";

const api = new Hono<{
  Bindings: CloudflareBindings;
  Variables: {
    user: AuthUser | null;
    session: AuthSession | null;
  };
}>();

api.get("/", async (c) => {
  const user = c.get("user");
  const db = getDb(c.env.DB);
  
  const plan = await getPlan(db, homePlanId);

  const userStatus = { isLoggedIn: !!user };

  if (!plan) {
    return c.html(<HomePageError user={userStatus} />);
  }

  return c.html(<HomePage user={userStatus} homePlan={plan} />);
});

api.route("/account", account);
api.route("/manage", manage);
api.route("/plans", plans);

export default api;
