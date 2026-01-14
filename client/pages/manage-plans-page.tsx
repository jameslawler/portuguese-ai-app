import type { FC } from "hono/jsx";

import Layout from "../components/layout";
import { Plan } from "../../types/plan";

const ManagePlansPage: FC<{ plans: Plan[] }> = (props: {
  plans: Plan[];
}) => {
  return (
    <Layout>
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
    </Layout>
  );
};

export default ManagePlansPage;
