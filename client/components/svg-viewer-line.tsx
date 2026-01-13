import type { FC } from "hono/jsx";

export type SvgViewerLineType = {
  type: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  stroke: string;
};

export const SvgViewerLine: FC<{
  node: SvgViewerLineType;
}> = ({ node }) => {
  return (
    <line
      x1={node.x1}
      y1={node.y1}
      x2={node.x2}
      y2={node.y2}
      stroke={node.stroke}
      stroke-width="2"
      stroke-dasharray="8"
    />
  );
};

export default SvgViewerLine;
