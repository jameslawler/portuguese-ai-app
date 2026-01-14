import type { FC } from "hono/jsx";

import Layout from "../components/layout";
import SvgViewer from "../components/svg-viewer";
import { Plan } from "../../types/plan";

const PlanPage: FC<{ plan: Plan }> = (props: {
  plan: Plan;
}) => {
  return (
    <Layout>
      <h1>Plan for { props.plan.id }</h1>
      <div class="flex h-full justify-center">
        <SvgViewer plan={ props.plan } />
      </div>
    </Layout>
  );
};

export default PlanPage;
