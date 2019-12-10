export interface ITooltipComponentProps {
  className: string;
  nearData: any;
  hover: boolean;
  x: number;
  y: number;
}

export interface ITooltipProps {
  className?: string;
  xLine?: boolean;
  xLineStroke?: string;
  xLineStrokeWidth?: string;
  xLineStrokeDasharray?: string;
  yLine?: boolean;
  yLineStroke?: string;
  yLineStrokeWidth?: string;
  yLineStrokeDasharray?: string;
  component: React.FunctionComponent<ITooltipComponentProps>;
}
