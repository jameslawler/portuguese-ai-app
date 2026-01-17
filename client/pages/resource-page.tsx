import type { FC } from "hono/jsx";

import Layout from "../components/layout";
import { User } from "../../types/auth";
import Navbar from "../components/navbar";
import { Resource } from "../../types/resource";

const ResourcePage: FC<{ user: User; resource: Resource }> = (props: {
  user: User;
  resource: Resource;
}) => {
  return (
    <div class="flex h-full justify-center">
      <main class="container">
        <div class="flex h-full justify-center">{props.resource.markdown}</div>
      </main>
    </div>
  );
};

export default ResourcePage;
