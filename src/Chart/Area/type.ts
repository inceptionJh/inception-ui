export interface IAreaContext {
  className: string;
  width: number;
  height: number;
  padding: { top: number; right: number; bottom: number, left: number };
}

export interface IChartAreaProps {
  className?: string;
  width: number;
  height: number;
  padding?: { top: number; right: number; bottom: number, left: number };
}
