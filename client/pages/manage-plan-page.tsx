import type { FC } from "hono/jsx";

import Layout from "../components/layout";
import SvgEditor from "../components/svg-editor";
import { Plan } from "../../types/plan";

const ManagePlanPage: FC<{ plan: Plan }> = (props: {
  plan: Plan;
}) => {
  return (
    <Layout>
      <h1>Builder for { props.plan.id }</h1>
      <div class="flex h-full">
        <div class="w-full">
          <SvgEditor plan={ props.plan } />
        </div>
      </div>
    </Layout>
  );
};

export default ManagePlanPage;
