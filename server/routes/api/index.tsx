import { Hono } from "hono";

import auth from "./auth";
import plans from "./plans";
import resources from "./resources";
import lessons from "./lessons";

const api = new Hono<{ Bindings: CloudflareBindings }>();

api.route("/auth", auth);

api.route("/v1/plans", plans);

api.route("/v1/resources", resources);

api.route("/v1/lessons", lessons);

export default api;
