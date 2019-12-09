import * as React from "react";

import styled from "styled-components";

import Portal from "../../../Portal";

import ShapeContext from "../../Shape/context";
import AreaContext from "../../Area/context";

import stringHelper from "../../../utils/string";

import { IYAxisProps } from "./type";

const YAxis: React.FunctionComponent<IYAxisProps> = (props) => {
  const areaCtx = React.useContext(AreaContext);
  const shapeCtx = React.useContext(ShapeContext);

  const [render, setRender] = React.useState(false);

  React.useEffect(() => {
    setRender(true);
  }, []);

  if (!render) return null;

  return (
    <Portal selector={`${stringHelper.className2Classes(areaCtx.className!)} > .y-axis`}>
      <path d={`M${areaCtx.padding.left} ${areaCtx.padding.top}, l0 ${shapeCtx.height}`} stroke="#000" />
      {props.ticks.map((d: any, i: number, g: any[]) => {
        return (
          <g
            key={`${props.className}-${i}`}
            transform={`translate(${areaCtx.padding.left} ${shapeCtx.yScale(d)})`}
          >
            <line x2="-5" stroke="#000" />
            <text
              x="-7"
              y="4"
              textAnchor="end"
              fontSize="10"
            >
              {props.tickFormat ? props.tickFormat(d, i, g.map((v) => v)) : d.valueOf()}
            </text>
          </g>
        );
      })}
    </Portal>
  );
};

export default styled(YAxis)``;
