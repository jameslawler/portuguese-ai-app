import type { FC } from "hono/jsx";

const AuthSignin: FC<{ errorMessage?: string, defaultEmail?: string }> = (props: {
  errorMessage?: string;
  defautEmail?: string;
}) => {
  return (
    <div id="signin-container">
      {props.errorMessage && (
        <p style="color:red">Error: ${props.errorMessage}</p>
      )}
      <form
        hx-post="/api/auth/sign-in/email"
        hx-target="#signin-container"
        hx-swap="outerHTML"
      >
        <input type="email" name="email" placeholder="Email" value={props.defautEmail} required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default AuthSignin;
