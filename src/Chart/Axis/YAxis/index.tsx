import * as React from "react";
import * as ReactDOM from "react-dom";

import styled from "styled-components";

import ShapeContext from "../../Shape/context";
import AreaContext from "../../Area/context";

import stringHelper from "../../../utils/string";

import { IYAxisProps } from "./type";

const _YAxis: React.FunctionComponent<IYAxisProps> = (props) => {
  const areaCtx = React.useContext(AreaContext);
  const shapeCtx = React.useContext(ShapeContext);

  const [render, setRender] = React.useState(false);

  React.useEffect(() => {
    setRender(true);
  }, []);

  if (!render) return null;

  return (
    ReactDOM.createPortal(
      <>
        <path d={`M${shapeCtx.padding.left} ${shapeCtx.padding.top}, l0 ${shapeCtx.height}`} stroke="#000" />
        {(props.ticks ? props.ticks : areaCtx.data.map((d: any) => d[shapeCtx.yKey])).map((d: any, i: number, g: any[]) => {
          return (
            <g
              key={`${props.className}-${i}`}
              transform={`translate(${shapeCtx.padding.left} ${shapeCtx.yScale(d)})`}
            >
              <line x2="-5" stroke="#000" />
              <text
                x="-7"
                textAnchor="end"
                dominantBaseline="middle"
                fontSize="10"
              >
                {props.tickFormat ? props.tickFormat(d, i, g.map((v) => v)) : d.valueOf()}
              </text>
            </g>
          );
        })}
      </>,
      document.querySelector(`${stringHelper.className2Classes(areaCtx.className!)} > .y-axis`)!,
    )
  );
};

export default styled(_YAxis)``;
