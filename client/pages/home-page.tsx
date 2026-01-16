import type { FC } from "hono/jsx";

import Layout from "../components/layout";
import Navbar from "../components/navbar";
import { Plan } from "../../types/plan";
import { User } from "../../types/auth";
import PlanViewer from "../components/plan-viewer";

const HomePage: FC<{ user: User; homePlan: Plan }> = (props: {
  user: User;
  homePlan: Plan;
}) => {
  return (
    <Layout>
      <Navbar user={props.user} />
      <div class="flex h-full justify-center">
        <main class="container">
          <PlanViewer plan={ props.homePlan } />
        </main>
      </div>
    </Layout>
  );
};

export default HomePage;
