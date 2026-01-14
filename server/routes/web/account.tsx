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
  const userStatus = { isLoggedIn: false };

  return c.html(<SignupPage user={userStatus} />);
});

api.get("/signin", (c) => {
  const userStatus = { isLoggedIn: false };
  
  return c.html(<SigninPage user={userStatus} />);
});

export default api;
