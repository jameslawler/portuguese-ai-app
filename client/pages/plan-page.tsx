import type { FC } from "hono/jsx";

import Layout from "../components/layout";
import SvgViewer from "../components/svg-viewer";
import { Plan } from "../../types/plan";
import { User } from "../../types/auth";
import Navbar from "../components/navbar";

const PlanPage: FC<{ user: User, plan: Plan }> = (props: {
  user: User;
  plan: Plan;
}) => {
  return (
    <Layout>
      <Navbar user={props.user} />
      <div class="flex h-full justify-center">
        <main class="container">
          <h1>Plan for { props.plan.id }</h1>
          <div class="flex h-full justify-center">
            <SvgViewer plan={ props.plan } />
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default PlanPage;
