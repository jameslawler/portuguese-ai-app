import type { FC } from "hono/jsx";

const SvgEditorPropertiesNode: FC = () => {
  return (
    <>
      <div
        {...{
          "x-show": "nodes[dragIndex].type!=='line-horizontal'",
        }}
        class="mb-4"
      >
        <label class="block mb-2.5 text-sm font-medium text-heading">X</label>
        <input
          {...{
            "x-bind:value": "dragIndex !== null ? nodes[dragIndex].x : ''",
            "x-on:input": "nodes[dragIndex].x = $event.target.value",
          }}
          type="text"
          class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
        />
      </div>

      <div
        {...{
          "x-show": "nodes[dragIndex].type!=='line-horizontal'",
        }}
        class="mb-4"
      >
        <label class="block mb-2.5 text-sm font-medium text-heading">Y</label>
        <input
          {...{
            "x-bind:value": "dragIndex !== null ? nodes[dragIndex].y : ''",
            "x-on:input": "nodes[dragIndex].y = $event.target.value",
          }}
          type="text"
          class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
        />
      </div>

      <div
        {...{
          "x-show": "nodes[dragIndex].type!=='line-horizontal'",
        }}
        class="mb-4"
      >
        <label class="block mb-2.5 text-sm font-medium text-heading">
          Message
        </label>
        <input
          {...{
            "x-bind:value":
              "dragIndex !== null ? nodes[dragIndex].message : ''",
            "x-on:input": "nodes[dragIndex].message = $event.target.value",
          }}
          type="text"
          class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
        />
      </div>
    </>
  );
};

const SvgEditorPropertiesLine: FC = () => {
  return (
    <>
      {["x1", "y1", "x2", "y2"].map((coord) => (
        <div
          {...{
            "x-show": "nodes[dragIndex].type==='line-horizontal'",
          }}
          class="mb-4"
        >
          <label class="block mb-2.5 text-sm font-medium text-heading">
            {coord.toUpperCase()}
          </label>
          <input
            {...{
              "x-bind:value": `dragIndex !== null ? nodes[dragIndex].${coord} : ''`,
              "x-on:input": `nodes[dragIndex].${coord} = $event.target.value`,
            }}
            type="text"
            class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          />
        </div>
      ))}
    </>
  );
};

export const SvgEditorProperties: FC<{ planId: string }> = ({ planId }) => {
  return (
    <>
      <form
        {...{
          "hx-put": `/api/v1/plans/${planId}`,
          "hx-trigger": "submit",
          "hx-swap": "none",
        }}
        class="mt-6"
      >
        <input type="hidden" name="name" value="New name" />
        <input
          {...{
            ":value": "JSON.stringify(nodes)",
          }}
          type="hidden"
          name="nodes"
        />
        <input
          type="checkbox"
          name="isHomePlan"
        />
        <button class="px-4 py-2 bg-blue-600 text-white rounded">
          Save diagram
        </button>
      </form>

      <div class="font-bold mb-6">Properties</div>

      <div class="flex flex-col">
        <SvgEditorPropertiesNode />
        <SvgEditorPropertiesLine />
      </div>
    </>
  );
};
