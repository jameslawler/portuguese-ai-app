import type { FC } from "hono/jsx";

import Layout from "../components/layout";
import SvgEditor from "../components/svg-editor";

const BuilderPage: FC<{ plan: { id: string, name: string | null, nodes: string | null } }> = (props: {
  plan: { id: string, name: string | null, nodes: string | null };
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

export default BuilderPage;
