import * as d3 from "d3";

import lineTypeMapper from "./Line/mapper";

type LineType = ((typeof lineTypeMapper.type) extends { [key: string]: infer T } ? T : never);

export type TShapeContext = {
  type: "scatter" | "bar" | LineType;
  data: any[];
  xKey: string;
  yKey: string;
  width: number;
  height: number;
  xScale: d3.ScaleLinear<number, number>;
  yScale: d3.ScaleLinear<number, number>;
  onMouseEnter?: (v: any, i: number, g: any[]) => void;
  onMouseLeave?: (v: any, i: number, g: any[]) => void;
} | {
  type: "range-bar";
  data: any[];
  xKey: string;
  yKey: string;
  yMinKey: string;
  yMaxKey: string;
  width: number;
  height: number;
  xScale: d3.ScaleLinear<number, number>;
  yScale: d3.ScaleLinear<number, number>;
  onMouseEnter?: (v: any, i: number, g: any[]) => void;
  onMouseLeave?: (v: any, i: number, g: any[]) => void;
};
