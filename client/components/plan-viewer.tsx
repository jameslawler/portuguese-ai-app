import type { FC } from "hono/jsx";
import { Plan } from "../../types/plan";
import SvgViewer from "./svg-viewer";

const PlanViewer: FC<{ plan: Plan }> = (props: { plan: Plan }) => {
  return (
    <div class="flex">
      <SvgViewer plan={props.plan} />
    </div>
  );
};

export default PlanViewer;
