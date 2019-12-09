export interface IRangeBarProps {
  className?: string;
  data: any[];
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
  onClick?: (v: any, i: number, g: any[]) => void;
  onMouseEnter?: (v: any, i: number, g: any[]) => void;
  onMouseLeave?: (v: any, i: number, g: any[]) => void;
}
