import type { FC } from "hono/jsx";

export const SvgEditorNodesTitle: FC = () => {
  return (
    <g
      {...{
        "x-show": "node.type==='title'",
        ":transform": "`translate(${node.x}, ${node.y})`",
        "@mousedown": "startDrag(index, $event, false, 'move')",
      }}
      class="hover:cursor-pointer"
    >
      <rect
        {...{
          ":width": "node.width",
          ":height": "node.height",
          ":fill": "node.color",
          ":stroke": "node.stroke",
        }}
        rx="8"
        ry="8"
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
  );
};

export const SvgEditorNodesUnit: FC = () => {
  return (
    <g
      {...{
        "x-show": "node.type==='unit'",
        ":transform": "`translate(${node.x}, ${node.y})`",
        "@mousedown": "startDrag(index, $event, false, 'move')",
      }}
      class="hover:cursor-pointer"
    >
      <rect
        {...{
          ":width": "node.width",
          ":height": "node.height",
          ":fill": "node.color",
          ":stroke": "node.stroke",
        }}
        rx="8"
        ry="8"
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
  );
};

export const SvgEditorNodesLesson: FC = () => {
  return (
    <g
      {...{
        "x-show": "node.type==='lesson'",
        ":transform": "`translate(${node.x}, ${node.y})`",
        "@mousedown": "startDrag(index, $event, false, 'move')",
      }}
      class="hover:cursor-pointer"
    >
      <rect
        {...{
          ":width": "node.width",
          ":height": "node.height",
          ":fill": "node.color",
          ":stroke": "node.stroke",
        }}
        rx="8"
        ry="8"
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
  );
};

export const SvgEditorNodesLine: FC = () => {
  return (
    <>
      <line
        {...{
          "x-show": "node.type==='line-horizontal'",
          "@mousedown": "startDrag(index, $event, false, 'move')",
          ":x1": "node.x1",
          ":y1": "node.y1",
          ":x2": "node.x2",
          ":y2": "node.y2",
        }}
        class="hover:cursor-pointer"
        stroke="black"
        stroke-width="2"
        stroke-dasharray="8"
      />

      <rect
        {...{
          "x-show": "node.type==='line-horizontal' && index === dragIndex",
          "@mousedown": "startDrag(index, $event, false, 'resizeLeft')",
          ":x": "node.x1 - 5",
          ":y": "node.y1 - 5",
        }}
        class="hover:cursor-pointer"
        width="10"
        height="10"
        fill="black"
      />

      <rect
        {...{
          "x-show": "node.type==='line-horizontal' && index === dragIndex",
          "@mousedown": "startDrag(index, $event, false, 'resizeRight')",
          ":x": "node.x2 - 5",
          ":y": "node.y2 - 5",
        }}
        class="hover:cursor-pointer"
        width="10"
        height="10"
        fill="black"
      />
    </>
  );
};
