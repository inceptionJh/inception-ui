export interface IRangeBarProps<D = any> {
  className?: string;
  data: D[];
  xKey: string;
  yKey: string;
  yMinKey: string;
  yMaxKey: string;
  width?: number;
  fill?: string;
  cursor?: string;
  opacity?: string;
  xScale: d3.ScaleLinear<number, number>;
  yScale: d3.ScaleLinear<number, number>;
  onClick?: (v: D, i: number, g: D[]) => void;
  onMouseEnter?: (v: D, i: number, g: D[]) => void;
  onMouseLeave?: (v: D, i: number, g: D[]) => void;
}
