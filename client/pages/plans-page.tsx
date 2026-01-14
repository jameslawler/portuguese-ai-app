import type { FC } from "hono/jsx";

import Layout from "../components/layout";
import { Plan } from "../../types/plan";
import { User } from "../../types/auth";
import Navbar from "../components/navbar";

const PlansPage: FC<{ user: User, plans: Plan[] }> = (props: {
  user: User;
  plans: Plan[];
}) => {
  return (
    <Layout>
      <Navbar user={props.user} />
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
