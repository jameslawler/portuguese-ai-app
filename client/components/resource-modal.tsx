import type { FC } from "hono/jsx";
import { marked } from "marked";

import { User } from "../../types/auth";
import { Resource } from "../../types/resource";

const ResourceModal: FC<{ user: User; resource: Resource }> = async (props: {
  user: User;
  resource: Resource;
}) => {
  const html = await marked(props.resource.markdown);

  return (
    <div class="flex flex-col">
      <div class="text-3xl font-bold mb-4">{props.resource.title}</div>
      <div
        class="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};

export default ResourceModal;
