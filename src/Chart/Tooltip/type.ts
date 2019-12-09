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
  yLine?: boolean;
  component: React.FunctionComponent<ITooltipComponentProps>;
}
