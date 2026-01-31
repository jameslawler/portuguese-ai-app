import { Hono } from "hono";
import api from "./routes/api";
import web from "./routes/web";
import { authMiddleware } from "./middleware/auth";
import { AuthUser, AuthSession } from "./auth";

const app = new Hono<{
  Bindings: CloudflareBindings;
  Variables: {
    user: AuthUser | null;
    session: AuthSession | null;
  };
}>();

app.use("*", authMiddleware());
app.route("/api", api);
app.route("/", web);

export default app;
