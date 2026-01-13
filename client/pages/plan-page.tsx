import type { FC } from "hono/jsx";

import Layout from "../components/layout";
import SvgViewer from "../components/svg-viewer";

const PlanPage: FC<{ plan: { id: string, name: string | null, nodes: string | null } }> = (props: {
  plan: { id: string, name: string | null, nodes: string | null };
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
