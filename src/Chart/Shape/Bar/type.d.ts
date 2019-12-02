export interface IBarProps {
  className?: string;
  xKey: string;
  yKey: string;
  width?: number;
  fill?: string;
  cursor?: string;
  opacity?: string;
  xScale?: d3.ScaleLinear<number, number>;
  yScale?: d3.ScaleLinear<number, number>;
  padding?: { top: number, right: number, bottom: number, left: number };
  onClick?: (v: any, i: number, g: any[]) => void;
  onMouseEnter?: (v: any, i: number, g: any[]) => void;
  onMouseLeave?: (v: any, i: number, g: any[]) => void;
}
