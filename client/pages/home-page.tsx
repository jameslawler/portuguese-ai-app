import type { FC } from "hono/jsx";

import Layout from "../components/layout";
import Navbar from "../components/navbar";
import { Plan } from "../../types/plan";
import { User } from "../../types/auth";
import SvgViewer from "../components/svg-viewer";

const HomePage: FC<{ user: User; homePlan: Plan }> = (props: {
  user: User;
  homePlan: Plan;
}) => {
  return (
    <Layout>
      <Navbar user={props.user} />
      <div class="flex h-full justify-center">
        <SvgViewer plan={ props.homePlan } />
      </div>
    </Layout>
  );
};

export default HomePage;
