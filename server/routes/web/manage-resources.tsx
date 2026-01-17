import { Hono } from "hono";

import { AuthUser, AuthSession } from "../../auth";
import { getDb } from "../../db";
import ManageResource from "../../../client/pages/manage-resource-page";
import ManageResources from "../../../client/pages/manage-resources-page";
import { getResource, getResources } from "../../db/repositories/resources";

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
  const resources = await getResources(db);

  return c.html(<ManageResources user={userStatus} resources={resources} />);
});

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

  return c.html(<ManageResource user={userStatus} resource={resource} />);
});

export default api;
