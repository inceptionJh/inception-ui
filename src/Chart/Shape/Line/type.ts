export interface ILineProps {
  className?: string;
  type?: "basis" | "basis-closed" | "basis-open" | "bundle" | "cardinal" | "cardinal-closed" | "cardinal-open" | "catmull-rom" | "catmull-rom-closed" | "catmull-rom-open" | "linear" | "linear-closed" | "monotone-x" | "monotone-y" | "natural" | "step" | "step-after" | "step-before";
  data: any[];
  xKey: string;
  yKey: string;
  stroke?: string;
  strokeWidth?: string;
  strokeDasharray?: string;
  opacity?: string;
  xScale: d3.ScaleLinear<number, number>;
  yScale: d3.ScaleLinear<number, number>;
}
