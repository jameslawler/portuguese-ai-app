import type { FC } from "hono/jsx";
import SvgViewerNode, { SvgViewerNodeType } from "./svg-viewer-node";
import SvgViewerLine, { SvgViewerLineType } from "./svg-viewer-line";

type Node = {
  type: string;
  x?: number;
  y?: number;
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
  width?: number;
  height?: number;
  color: string;
  stroke: string;
  message?: string;
  lineType?: string;
};

export const SvgViewer: FC<{
  plan: { id: string; name: string | null; nodes: string | null };
}> = ({ plan }) => {
  if (!plan.nodes) {
    return <div></div>;
  }

  const nodesJson = JSON.parse(plan.nodes) as Node[];

  return (
    <svg width="1000" height="1000">
      {nodesJson.map((node, index) => {
        switch (node.type) {
          case "title":
            return (
              <SvgViewerNode node={node as SvgViewerNodeType} index={index} />
            );

          case "unit":
            return (
              <SvgViewerNode node={node as SvgViewerNodeType} index={index} />
            );

          case "lesson":
            return (
              <SvgViewerNode node={node as SvgViewerNodeType} index={index} />
            );

          case "line-horizontal":
            return <SvgViewerLine node={node as SvgViewerLineType} />;

          default:
            return null;
        }
      })}
    </svg>
  );
};

export default SvgViewer;
