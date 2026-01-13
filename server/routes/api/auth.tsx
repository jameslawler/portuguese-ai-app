import { Hono } from "hono";

import { getDb } from "../../db";
import { getAuth } from "../../auth";
import AuthSignup from "../../../client/components/auth-signup";
import AuthSignin from "../../../client/components/auth-signin";

const isSignupEnabled = false;

const api = new Hono<{ Bindings: CloudflareBindings }>();

api.post("/sign-up/email", async (c) => {
  const db = getDb(c.env.DB);
  const auth = getAuth(db);

  const formData = await c.req.formData();
  const body = Object.fromEntries(formData.entries()) as {
    name: string;
    email: string;
    password: string;
  };

  if (!isSignupEnabled) {
    return c.html(
      <AuthSignup
        errorMessage="New accounts are currently not allowed."
        defaultName={body.name}
        defaultEmail={body.email}
      />
    );
  }

  try {
    await auth.api.signUpEmail({ body });

    return c.body(null, 200, {
      "HX-Redirect": "/signin",
    });
  } catch (err: any) {
    return c.html(
      <AuthSignup
        errorMessage={err.message}
        defaultName={body.name}
        defaultEmail={body.email}
      />
    );
  }
});

api.post("/sign-in/email", async (c) => {
  const db = getDb(c.env.DB);
  const auth = getAuth(db);

  const formData = await c.req.formData();
  const body = Object.fromEntries(formData.entries()) as {
    email: string;
    password: string;
  };

  try {
    const response = await auth.api.signInEmail({
      body,
      asResponse: true,
      headers: c.req.raw.headers
    });

    response.headers.set("HX-Redirect", "/");

    return response;
  } catch (err: any) {
    return c.html(
      <AuthSignin errorMessage={err.message} defaultEmail={body.email} />
    );
  }
});

api.post("/sign-out", async (c) => {
  const db = getDb(c.env.DB);
  const auth = getAuth(db);

  try {
    const response = await auth.api.signOut({
      asResponse: true,
      headers: c.req.raw.headers
    });

    response.headers.set("HX-Redirect", "/");

    return response;
  } catch (err: any) {
    return c.html(
      <AuthSignin errorMessage={err.message} />
    );
  }
});

export default api;
