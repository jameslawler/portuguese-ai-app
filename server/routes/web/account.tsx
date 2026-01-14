import { Hono } from "hono";

import { AuthUser, AuthSession } from "../../auth";
import SignupPage from "../../../client/pages/signup-page";
import SigninPage from "../../../client/pages/signin-page";

const api = new Hono<{
  Bindings: CloudflareBindings;
  Variables: {
    user: AuthUser | null;
    session: AuthSession | null;
  };
}>();

api.get("/signup", (c) => {
  return c.html(<SignupPage />);
});

api.get("/signin", (c) => {
  return c.html(<SigninPage />);
});

export default api;
