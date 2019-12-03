import * as d3 from "d3";

export interface IShapeContext {
  type: "scatter" | "bar" | "line" | "step-line";
  data: any[];
  xKey: string;
  yKey: string;
  width: number;
  height: number;
  xScale: d3.ScaleLinear<number, number>;
  yScale: d3.ScaleLinear<number, number>;
  onMouseEnter?: (v: any, i: number, g: any[]) => void;
  onMouseLeave?: (v: any, i: number, g: any[]) => void;
}
