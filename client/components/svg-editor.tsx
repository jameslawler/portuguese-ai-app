import type { FC } from "hono/jsx";

const SvgEditor: FC<{
}> = (props: { }) => {
  const html = `
    <div x-data="svgEditor()" class="flex flex-row">
      <div>
        <svg width="1200" height="1011"
            @mousemove="dragging && dragNode($event)"
            @mouseup="dragging = false"
            @mouseleave="dragging = false">
          <defs>
            <pattern
              id="grid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="#cccccc"
                stroke-width="1"
              />
            </pattern>
          </defs>
          <g transform="translate(20 20)">
            <rect
              x="0"
              y="0"
              width="160"
              height="200"
              fill="none"
              rx="8"
              ry="8"
              stroke="black"
              stroke-width="3"
            />
            <template x-for="(node, index) in options" :key="index">
              <g :transform="\`translate(\${node.x}, \${node.y})\`"
                @mousedown="createAndDrag(index, $event)"
                class="hover:cursor-pointer">
                <rect
                  :width="node.width"
                  :height="node.height"
                  :fill="node.color"
                  rx="8"
                  ry="8"
                  stroke="black"
                  stroke-width="3"
                />
                <text
                  :x="node.width / 2"
                  :y="node.height / 2"
                  text-anchor="middle"
                  dominant-baseline="middle"
                  style="user-select: none"
                  x-text="node.message"
                />
              </g>
            </template>
          </g>
          <g transform="translate(200 20)">
            <rect
              x="0"
              y="0"
              width="961"
              height="961"
              fill="url(#grid)"
            />
            <template x-for="(node, index) in nodes" :key="index">
              <g :transform="\`translate(\${node.x}, \${node.y})\`"
                @mousedown="startDrag(index, $event)"
                class="hover:cursor-pointer">
                <rect
                  :width="node.width"
                  :height="node.height"
                  :fill="node.color"
                  rx="8"
                  ry="8"
                  stroke="black"
                  stroke-width="3"
                />
                <text
                  :x="node.width / 2"
                  :y="node.height / 2"
                  text-anchor="middle"
                  dominant-baseline="middle"
                  style="user-select: none"
                  x-text="node.message"
                />
              </g>
            </template>
          <g>
        </svg>
      </div>
      <div class="mt-6">
        <div class="font-bold mb-6">Properties</div>
        <div class="flex flex-col">
          <div class="mb-4">
            <label for="email" class="block mb-2.5 text-sm font-medium text-heading">X</label>
            <input type="text"
                x-bind:value="dragIndex !== null ? nodes[dragIndex].x : ''"
                x-on:input="nodes[dragIndex].x = $event.target.value"
                class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" />
          </div>
          <div class="mb-4">
            <label for="email" class="block mb-2.5 text-sm font-medium text-heading">Y</label>
            <input type="text"
                x-bind:value="dragIndex !== null ? nodes[dragIndex].y : ''"
                x-on:input="nodes[dragIndex].y = $event.target.value"
                class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" />
          </div>
          <div class="mb-4">
            <label for="email" class="block mb-2.5 text-sm font-medium text-heading">Mesage</label>
            <input type="text"
                x-bind:value="dragIndex !== null ? nodes[dragIndex].message : ''"
                x-on:input="nodes[dragIndex].message = $event.target.value"
                class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" />
          </div>
        </div>
      </div>
    </div>

    <script>
      function svgEditor() {
        return {
          options: [
            { x: 20, y: 20, width: 120, height: 40, color: 'lightblue', message: 'Unit' },
            { x: 20, y: 80, width: 120, height: 40, color: 'lightgreen', message: 'Lesson' }
          ],
          nodes: [],
          dragging: false,
          dragIndex: null,
          isAllowedOutOfBound: false,
          offsetX: 0,
          offsetY: 0,
          gridSize: 20,
          startDrag(index, event, isAllowedOutOfBound = false) {
            this.dragging = true;
            this.dragIndex = index;
            this.isAllowedOutOfBound = isAllowedOutOfBound;

            // Calculate mouse offset inside the node
            const node = this.nodes[index];
            this.offsetX = event.offsetX - node.x;
            this.offsetY = event.offsetY - node.y;
          },
          createAndDrag(optionIndex, event) {
            const option = this.options[optionIndex];
            this.nodes.push({
              x: -160,
              y: option.y,
              width: option.width,
              height: option.height,
              color: option.color,
              message: 'new node'
            });
            this.startDrag(this.nodes.length - 1, event, true);
          },
          dragNode(event) {
            if (this.dragging && this.dragIndex !== null) {
              let newX = event.offsetX - this.offsetX;
              let newY = event.offsetY - this.offsetY;

              // Snap to nearest grid
              newX = Math.round(newX / this.gridSize) * this.gridSize;
              newY = Math.round(newY / this.gridSize) * this.gridSize;

              // Check bounds of map
              const node = this.nodes[this.dragIndex];

              if (this.isAllowedOutOfBound && newX > 0 && newY > 0) {
                this.isAllowedOutOfBound = false;
              }

              if (!this.isAllowedOutOfBound) {
                newX = newX < 0 ? 0 : newX
                newY = newY < 0 ? 0 : newY
              }

              newX = newX > (960 - node.width) ? (960 - node.width) : newX
              newY = newY > (960 - node.height) ? (960 - node.height) : newY

              this.nodes[this.dragIndex].x = newX;
              this.nodes[this.dragIndex].y = newY;
            }
          }
        }
      }
      document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll('svg template').forEach(el => {
          const template = el.ownerDocument.createElement('template');
          for (const attr of el.attributes) 
            template.setAttributeNode(attr.cloneNode())
          template.content.append(...el.children)
          el.replaceWith(template)
        })
      });
    </script>
  `;

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default SvgEditor;
