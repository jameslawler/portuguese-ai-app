const SvgEditorPropertiesNode = `
  <div x-show="nodes[dragIndex].type!=='line-horizontal'" class="mb-4">
    <label for="email" class="block mb-2.5 text-sm font-medium text-heading">X</label>
    <input type="text"
        x-bind:value="dragIndex !== null ? nodes[dragIndex].x : ''"
        x-on:input="nodes[dragIndex].x = $event.target.value"
        class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" />
  </div>
  <div x-show="nodes[dragIndex].type!=='line-horizontal'" class="mb-4">
    <label for="email" class="block mb-2.5 text-sm font-medium text-heading">Y</label>
    <input type="text"
        x-bind:value="dragIndex !== null ? nodes[dragIndex].y : ''"
        x-on:input="nodes[dragIndex].y = $event.target.value"
        class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" />
  </div>
  <div x-show="nodes[dragIndex].type!=='line-horizontal'" class="mb-4">
    <label for="email" class="block mb-2.5 text-sm font-medium text-heading">Mesage</label>
    <input type="text"
        x-bind:value="dragIndex !== null ? nodes[dragIndex].message : ''"
        x-on:input="nodes[dragIndex].message = $event.target.value"
        class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" />
  </div>
`;

const SvgEditorPropertiesLine = `
  <div x-show="nodes[dragIndex].type==='line-horizontal'" class="mb-4">
    <label for="email" class="block mb-2.5 text-sm font-medium text-heading">X1</label>
    <input type="text"
        x-bind:value="dragIndex !== null ? nodes[dragIndex].x1 : ''"
        x-on:input="nodes[dragIndex].x1 = $event.target.value"
        class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" />
  </div>
  <div x-show="nodes[dragIndex].type==='line-horizontal'" class="mb-4">
    <label for="email" class="block mb-2.5 text-sm font-medium text-heading">Y1</label>
    <input type="text"
        x-bind:value="dragIndex !== null ? nodes[dragIndex].y1 : ''"
        x-on:input="nodes[dragIndex].y1 = $event.target.value"
        class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" />
  </div>
  <div x-show="nodes[dragIndex].type==='line-horizontal'" class="mb-4">
    <label for="email" class="block mb-2.5 text-sm font-medium text-heading">X2</label>
    <input type="text"
        x-bind:value="dragIndex !== null ? nodes[dragIndex].x2 : ''"
        x-on:input="nodes[dragIndex].x2 = $event.target.value"
        class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" />
  </div>
  <div x-show="nodes[dragIndex].type==='line-horizontal'" class="mb-4">
    <label for="email" class="block mb-2.5 text-sm font-medium text-heading">Y2</label>
    <input type="text"
        x-bind:value="dragIndex !== null ? nodes[dragIndex].y2 : ''"
        x-on:input="nodes[dragIndex].y2 = $event.target.value"
        class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" />
  </div>
`;

export const getSvgEditorProperties = (planId: string) => `
    <form
      hx-put="/api/v1/plans/${planId}"
      hx-trigger="submit"
      hx-swap="none"
      class="mt-6"
    >
      <input
        type="hidden"
        name="name"
        value="New name"
      />
      <input
        type="hidden"
        name="nodes"
        :value="JSON.stringify(nodes)"
      />
      <button
        type="submit"
        class="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Save diagram
      </button>
    </form>
    <div class="font-bold mb-6">Properties</div>
    <div class="flex flex-col">
      ${SvgEditorPropertiesNode}
      ${SvgEditorPropertiesLine}
    </div>
  `;
