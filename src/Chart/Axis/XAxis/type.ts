export interface IXAxisProps {
  className?: string;
  ticks: any[];
  tickFormat?: (v: any, i: number, g: any[]) => void;
}
