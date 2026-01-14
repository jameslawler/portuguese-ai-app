import type { FC } from "hono/jsx";

import Layout from "../components/layout";
import AuthSignin from "../components/auth-signin";
import { User } from "../../types/auth";
import Navbar from "../components/navbar";

const SigninPage: FC<{ user: User }> = (props: {
  user: User;
}) => {
  return (
    <Layout>
      <Navbar user={props.user} />
      <h1>Sign In</h1>
      <AuthSignin />
    </Layout>
  );
};

export default SigninPage;
