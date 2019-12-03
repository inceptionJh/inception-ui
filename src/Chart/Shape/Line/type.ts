export interface ILineProps {
  className?: string;
  xKey: string;
  yKey: string;
  stroke?: string;
  strokeWidth?: string;
  strokeDasharray?: string;
  opacity?: string;
  xScale?: d3.ScaleLinear<number, number>;
  yScale?: d3.ScaleLinear<number, number>;
  padding?: { top: number, right: number, bottom: number, left: number };
}
