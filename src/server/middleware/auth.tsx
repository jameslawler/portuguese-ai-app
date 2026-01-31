import type { Context, Next } from "hono";
import { getDb } from "../db";
import { getAuth } from "../auth";
import type { AuthUser, AuthSession } from "../auth";

export const authMiddleware = () => {
  return async (c: Context, next: Next) => {
    const db = getDb(c.env.DB);
    const auth = getAuth(db);

    // Get session from request headers
    const session = await auth.api.getSession({ headers: c.req.raw.headers });

    if (!session) {
      c.set("user", null);
      c.set("session", null);
      await next();
      return;
    }

    // Set user/session on context
    c.set("user", session.user as AuthUser);
    c.set("session", session.session as AuthSession);

    await next();
  };
};
