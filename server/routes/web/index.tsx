import { Hono } from "hono";

import { AuthUser, AuthSession } from "../../auth";
import HomePage from "../../../client/pages/home-page";
import account from "./account";
import managePlans from "./manage-plans";
import manageResources from "./manage-resources";
import manageLessons from "./manage-lessons";
import plans from "./plans";
import resources from "./resources";
import lessons from "./lessons";
import nodes from "./nodes";
import { getDb } from "../../db";
import { getHomePlan } from "../../db/repositories/plans";
import HomePageError from "../../../client/pages/home-page-error";

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

  const plan = await getHomePlan(db);

  const userStatus = { isLoggedIn: !!user };

  if (!plan) {
    return c.html(<HomePageError user={userStatus} />);
  }

  return c.html(<HomePage user={userStatus} homePlan={plan} />);
});

api.route("/account", account);

api.route("/manage/plans", managePlans);

api.route("/manage/resources", manageResources);

api.route("/manage/lessons", manageLessons);

api.route("/plans", plans);

api.route("/resources", resources);

api.route("/lessons", lessons);

api.route("/nodes", nodes);

export default api;
