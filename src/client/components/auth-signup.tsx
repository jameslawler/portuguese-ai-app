import type { FC } from "hono/jsx";

const AuthSignup: FC<{ errorMessage?: string, defaultName?: string, defaultEmail?: string }> = (props: {
  errorMessage?: string;
  defaultName?: string;
  defautEmail?: string;
}) => {
  return (
    <div id="signup-container">
      {props.errorMessage && (
        <p style="color:red">Error: {props.errorMessage}</p>
      )}
      <form
        hx-post="/api/auth/sign-up/email"
        hx-target="#signup-container"
        hx-swap="outerHTML"
      >
        <input type="text" name="name" placeholder="Full Name" value={props.defaultName} required />
        <input type="email" name="email" placeholder="Email" value={props.defautEmail} required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default AuthSignup;
