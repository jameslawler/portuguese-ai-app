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
      <div
        {...{
          "x-show": "nodes[dragIndex].type!=='line-horizontal'",
        }}
        class="mb-4"
      >
        <label class="block mb-2.5 text-sm font-medium text-heading">
          Resource Id
        </label>
        <input
          {...{
            "x-bind:value":
              "dragIndex !== null ? nodes[dragIndex].resourceId : ''",
            "x-on:input": "nodes[dragIndex].resourceId = $event.target.value",
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
          Lesson Id
        </label>
        <input
          {...{
            "x-bind:value":
              "dragIndex !== null ? nodes[dragIndex].lessonId : ''",
            "x-on:input": "nodes[dragIndex].lessonId = $event.target.value",
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
      <div
        {...{
          "x-show": "nodes[dragIndex].type==='line-horizontal'",
        }}
        class="mb-4"
      >
        <label class="block mb-2.5 text-sm font-medium text-heading">
          Type
        </label>
        <select
          x-bind:value="dragIndex !== null ? nodes[dragIndex].lineType : ''"
          x-on:change="nodes[dragIndex].lineType = $event.target.value"
          class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
        >
          <option value="">Select a line type</option>
          <option value="solid">Solid</option>
          <option value="dotted">Dotted</option>
        </select>
      </div>
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
      >
        <input type="hidden" name="name" value="New name" />
        <input
          {...{
            ":value": "JSON.stringify(nodes)",
          }}
          type="hidden"
          name="nodes"
        />
        <label class="flex items-center gap-2 text-sm text-gray-700">
          <span>Is shown on home</span>
          <input
            type="checkbox"
            name="isHomePlan"
            class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
        </label>
        <button class="my-4 px-4 py-2 bg-blue-600 text-white rounded">
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
