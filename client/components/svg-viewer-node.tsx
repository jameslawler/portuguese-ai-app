import type { FC } from "hono/jsx";

export type SvgViewerNodeType = {
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  stroke: string;
  message?: string;
  resourceId?: string;
  lessonId?: string;
};

export const SvgViewerNode: FC<{
  node: SvgViewerNodeType;
  index: number;
}> = ({ node, index }) => {
  return (
    <g
      {...{
        "hx-post": "/nodes",
        "hx-target": "#modal-content",
        "hx-trigger": "click",
        "hx-vals": JSON.stringify({
          resourceId: node.resourceId,
          lessonId: node.lessonId,
        }),
      }}
      class="hover:cursor-pointer"
      onclick="document.getElementById('modal').classList.remove('hidden')"
      key={index}
      transform={`translate(${node.x}, ${node.y})`}
    >
      <rect
        width={node.width}
        height={node.height}
        rx="8"
        ry="8"
        fill={node.color}
        stroke={node.stroke}
        stroke-width="3"
      />
      <text
        x={(node.width || 100) / 2}
        y={(node.height || 30) / 2}
        text-anchor="middle"
        dominant-baseline="middle"
      >
        {node.message}
      </text>
    </g>
  );
};

export default SvgViewerNode;
