import { Hono } from "hono";

import auth from "./auth";
import plans from "./plans";
import resources from "./resources";

const api = new Hono<{ Bindings: CloudflareBindings }>();

api.route("/auth", auth);

api.route("/v1/plans", plans);

api.route("/v1/resources", resources);

api.get("/content", (c) => {
  return c.html(<b>Pong</b>);
});

export default api;
