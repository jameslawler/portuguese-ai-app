import type { FC } from "hono/jsx";

import Layout from "../components/layout";
import AuthSignup from "../components/auth-signup";
import { User } from "../../types/auth";
import Navbar from "../components/navbar";

const SignupPage: FC<{ user: User }> = (props: {
  user: User;
}) => {
  return (
    <Layout>
      <Navbar user={props.user} />
      <h1>Sign Up</h1>
      <AuthSignup />
    </Layout>
  );
};

export default SignupPage;
