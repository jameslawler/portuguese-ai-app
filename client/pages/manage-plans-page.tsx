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
      <div class="container mx-auto">
        <h1>List</h1>
        <form hx-post="/api/v1/plans">
          <input type="text" name="name" value="My first plan" />
          <button
            type="submit"
            class="mb-4 rounded bg-blue-600 px-4 py-2 text-white"
          >
            New plan
          </button>
        </form>

        <div class="flex h-full">
          <div class="w-full">
            { props.plans.map((plan) => (
              <div><a href={`/manage/edit/${plan.id}`}>{plan.name}</a></div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ManagePlansPage;
