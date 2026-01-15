import { Hono } from "hono";

import auth from "./auth";
import plans from "./plans";

const api = new Hono<{ Bindings: CloudflareBindings }>();

api.route("/auth", auth);

api.route("/v1/plans", plans);

export default api;
