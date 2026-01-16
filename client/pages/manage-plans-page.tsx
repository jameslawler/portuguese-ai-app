import type { FC } from "hono/jsx";

import Layout from "../components/layout";
import { Plan } from "../../types/plan";
import { User } from "../../types/auth";
import Navbar from "../components/navbar";

const ManagePlansPage: FC<{ user: User, plans: Plan[] }> = (props: {
  user: User;
  plans: Plan[];
}) => {
  return (
    <Layout>
      <Navbar user={props.user} />
      <div class="flex h-full justify-center">
        <main class="container">
          <form hx-post="/api/v1/plans">
            <input type="text" name="name" value="My plan" />
            <button
              type="submit"
              class="mb-4 rounded bg-blue-600 px-4 py-2 text-white hover:cursor-pointer"
            >
              New plan
            </button>
          </form>
          <h1 class="text-2xl font-semibold mb-6">Plans</h1>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {props.plans.map((plan) => (
              <a
                href={`/manage/${plan.id}`}
                class="block rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200 hover:shadow-md hover:ring-blue-500 transition"
              >
                <h2 class="text-lg font-medium text-gray-900">
                  {plan.name ?? "Untitled Plan"}
                </h2>
              </a>
            ))}
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default ManagePlansPage;
