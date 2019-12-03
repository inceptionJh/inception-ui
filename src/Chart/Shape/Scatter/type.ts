export interface IScatterProps {
  className?: string;
  data: any[];
  xKey: string;
  yKey: string;
  r?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: string;
  strokeDasharray?: string;
  opacity?: string;
  xScale: d3.ScaleLinear<number, number>;
  yScale: d3.ScaleLinear<number, number>;
}
