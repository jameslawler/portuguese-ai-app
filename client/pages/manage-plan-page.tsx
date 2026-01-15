import type { FC } from "hono/jsx";

import Layout from "../components/layout";
import SvgEditor from "../components/svg-editor";
import { Plan } from "../../types/plan";
import { User } from "../../types/auth";
import Navbar from "../components/navbar";

const ManagePlanPage: FC<{ user: User, plan: Plan }> = (props: {
  user: User;
  plan: Plan;
}) => {
  return (
    <Layout>
      <Navbar user={props.user} />
      <div class="flex h-full justify-center">
        <main>
          <h1>Builder for { props.plan.id }</h1>
          <div class="flex h-full">
            <div class="w-full">
              <SvgEditor plan={ props.plan } />
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default ManagePlanPage;
