import type { FC } from "hono/jsx";
import { Plan } from "../../types/plan";

const PlanModal: FC<{ plan: Plan }> = (props: { plan: Plan }) => {
  return (
    <div
      id="modal"
      class="fixed inset-0 z-50 hidden bg-black/50"
      onclick="if (event.target === this) this.classList.add('hidden')"
    >
      <div class="absolute right-0 top-0 h-full w-125 bg-white shadow-xl flex flex-col">
        <div class="flex p-4">
          <button
            onclick="document.getElementById('modal').classList.add('hidden')"
            class="ml-auto text-gray-400 hover:text-gray-600 hover:cursor-pointer"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div
          id="modal-content"
          class="flex-1 overflow-y-auto p-4 text-sm text-gray-700"
        >
          Loading…
        </div>
      </div>
    </div>
  );
};

export default PlanModal;
