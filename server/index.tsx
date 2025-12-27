import { Hono } from "hono";
import api from "./routes/api";
import web from "./routes/web";

const app = new Hono();

app.route("/api", api);
app.route("/", web);

export default app;
