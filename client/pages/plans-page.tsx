import type { FC } from "hono/jsx";

import Layout from "../components/layout";
import { Plan } from "../../types/plan";

const PlansPage: FC<{ plans: Plan[] }> = (props: {
  plans: Plan[];
}) => {
  return (
    <Layout>
      <h1>List</h1>
      <div class="flex h-full">
        <div class="w-full">
          { props.plans.map((plan) => (
            <div><a href={`/plans/${plan.id}`}>{plan.name}</a></div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default PlansPage;
