import { Hono } from "hono";

import { AuthUser, AuthSession } from "../../auth";
import { getDb } from "../../db";
import { getResource } from "../../db/repositories/resources";
import ResourcePage from "../../../client/pages/resource-page";

const api = new Hono<{
  Bindings: CloudflareBindings;
  Variables: {
    user: AuthUser | null;
    session: AuthSession | null;
  };
}>();

api.get("/:id", async (c) => {
  const user = c.get("user");

  if (!user) {
    return c.body(null, 401);
  }

  const db = getDb(c.env.DB);
  const userStatus = { isLoggedIn: !!user };
  const resourceId = c.req.param("id");
  const resource = await getResource(db, resourceId);

  if (!resource) {
    return c.json({ error: "Resource not found" }, 404);
  }

  return c.html(<ResourcePage user={userStatus} resource={resource} />);
});

export default api;
