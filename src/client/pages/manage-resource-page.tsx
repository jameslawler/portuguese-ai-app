import type { FC } from "hono/jsx";

import Layout from "../components/layout";
import { User } from "../../types/auth";
import Navbar from "../components/navbar";
import { Resource } from "../../types/resource";

const ManageResourcePage: FC<{ user: User; resource: Resource }> = (props: {
  user: User;
  resource: Resource;
}) => {
  return (
    <Layout>
      <Navbar user={props.user} />
      <div class="flex h-full justify-center mt-8">
        <main class="w-full max-w-2xl">
          <h1 class="text-2xl font-semibold mb-6">Edit Resource</h1>
          <form
            hx-put={`/api/v1/resources/${props.resource.id}`}
            hx-trigger="submit"
            hx-swap="outerHTML"
            class="space-y-4"
          >
            <div>
              <label
                for="title"
                class="block text-sm font-medium text-gray-700 mb-1"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={props.resource.title}
                class="block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-2"
              />
            </div>
            <div>
              <label
                for="markdown"
                class="block text-sm font-medium text-gray-700 mb-1"
              >
                Markdown
              </label>
              <textarea
                name="markdown"
                id="markdown"
                rows={8}
                class="block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-2"
              >
                {props.resource.markdown}
              </textarea>
            </div>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Save
            </button>
            <div
              hx-target="this"
              hx-swap="outerHTML"
              class="text-green-600 text-sm mt-2 hidden"
            >
              Saved!
            </div>
          </form>
        </main>
      </div>
    </Layout>
  );
};

export default ManageResourcePage;
