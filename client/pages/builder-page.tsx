import type { FC } from "hono/jsx";

import Layout from "../components/layout";
import SvgEditor from "../components/svg-editor";

const BuilderPage: FC = () => {
  return (
    <Layout>
      <h1>Builder</h1>
      <div class="flex h-full">
        <div class="w-full">
          <SvgEditor />
        </div>
      </div>
    </Layout>
  );
};

export default BuilderPage;
