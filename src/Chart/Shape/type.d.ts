import * as d3 from "d3";

export type TShapeContext = {
  type: "scatter" | "bar";
  xKey: string;
  yKey: string;
  width: number;
  height: number;
  padding: { top: number, right: number, bottom: number, left: number };
  xScale: d3.ScaleLinear<number, number>;
  yScale: d3.ScaleLinear<number, number>;
  onMouseEnter?: (v: any, i: number, g: any[]) => void;
  onMouseLeave?: (v: any, i: number, g: any[]) => void;
};
