import type { FC } from "hono/jsx";

import { SvgEditorProperties } from "./svg-editor-properties";
import { getSvgEditorScript } from "./svg-editor-script";
import {
  SvgEditorNodesLesson,
  SvgEditorNodesLine,
  SvgEditorNodesTitle,
  SvgEditorNodesUnit,
} from "./svg-editor-nodes";

export const SvgEditor: FC<{
  plan: { id: string; name: string | null; nodes: string | null };
}> = ({ plan }) => {
  return (
    <div {...{ "x-data": "svgEditor()" }} class="flex flex-row">
      <svg
        width="1200"
        height="1011"
        {...{
          "@mousemove": "dragging && dragNode($event)",
          "@mouseup": "endDrag($event)",
          "@mouseleave": "endDrag($event)",
        }}
      >
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

        {/* Sidebar nodes */}
        <g transform="translate(20 20)">
          <rect
            x="0"
            y="0"
            width="160"
            height="400"
            fill="none"
            rx="8"
            ry="8"
            stroke="black"
            stroke-width="3"
          />
          <template {...{ "x-for": "(node, index) in options", ":key": "index" }}>
            <g
              {...{
                ":transform": "`translate(${node.x}, ${node.y})`",
                "@mousedown": "createAndDrag(index, $event)",
              }}
              class="hover:cursor-pointer"
            >
              <rect
                {...{
                  ":width": "node.width",
                  ":height": "node.height",
                  ":fill": "node.color",
                }}
                rx="8"
                ry="8"
                stroke="black"
                stroke-width="3"
              />
              <text
                {...{
                  ":x": "node.width / 2",
                  ":y": "node.height / 2",
                  "x-text": "node.message",
                }}
                text-anchor="middle"
                dominant-baseline="middle"
                style="user-select: none"
              />
            </g>
          </template>
        </g>

        {/* Main canvas nodes */}
        <g transform="translate(200 20)">
          <rect x="0" y="0" width="961" height="961" fill="url(#grid)" />
          <template {...{ "x-for": "(node, index) in nodes", ":key": "index" }}>
            <g>
              <SvgEditorNodesTitle />
              <SvgEditorNodesUnit />
              <SvgEditorNodesLesson />
              <SvgEditorNodesLine />
            </g>
          </template>
        </g>
      </svg>

      <div class="mt-6">
        <SvgEditorProperties planId={plan.id} />
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: getSvgEditorScript(plan.nodes || "[]"),
        }}
      />
    </div>
  );
};

export default SvgEditor;
