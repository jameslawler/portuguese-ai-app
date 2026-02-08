import { Hono } from "hono";

import { AuthUser, AuthSession } from "../../auth";
import { getDb } from "../../db";
import { getScenarioSessions } from "../../db/repositories/scenario-sessions";
import ScenarioModal from "../../../client/components/modal-scenario";

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
  const sessions = await getScenarioSessions(db);

  return c.html(<ScenarioModal user={userStatus} sessions={sessions} />);
});

export default api;
