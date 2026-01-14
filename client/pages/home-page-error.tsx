import type { FC } from "hono/jsx";

import Layout from "../components/layout";
import Navbar from "../components/navbar";
import { User } from "../../types/auth";

const HomePageError: FC<{ user: User; }> = (props: {
  user: User;
}) => {
  return (
    <Layout>
      <Navbar user={props.user} />
    </Layout>
  );
};

export default HomePageError;
