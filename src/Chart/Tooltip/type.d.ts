export interface ITooltipComponentProps {
  className: string;
  nearData: any;
  hover: boolean;
  x: number;
  y: number;
}

export interface ITooltipProps {
  className?: string;
  component: React.FunctionComponent<ITooltipComponentProps>;
}
