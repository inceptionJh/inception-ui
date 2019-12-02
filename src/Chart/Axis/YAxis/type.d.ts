export interface IYAxisProps {
  className?: string;
  ticks?: number[];
  tickFormat?: (d: any, i: number, g: any[]) => void;
}
