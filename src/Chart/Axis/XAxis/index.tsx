import * as React from "react";
import * as ReactDOM from "react-dom";

import styled from "styled-components";

import ShapeContext from "../../Shape/context";
import AreaContext from "../../Area/context";

import stringHelper from "../../../utils/string";

import { IXAxisProps } from "./type";

const XAxis: React.FunctionComponent<IXAxisProps> = (props) => {
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
        <path d={`M${shapeCtx.padding.left} ${shapeCtx.padding.top + shapeCtx.height}, l${shapeCtx.width} 0`} stroke="#000" />
        {(props.ticks ? props.ticks : areaCtx.data.map((d: any) => d[shapeCtx.xKey])).map((v: any, i: number, g: any[]) => {
          return (
            <g
              key={`${props.className}-${i}`}
              transform={`translate(${shapeCtx.xScale(v)} ${shapeCtx.padding.top + shapeCtx.height})`}
            >
              <line y2="5" stroke="#000" />
              <text
                y="5"
                textAnchor="middle"
                dominantBaseline="hanging"
                fontSize="10"
              >
                {props.tickFormat ? props.tickFormat(v, i, g.map((t) => t)) : v.valueOf()}
              </text>
            </g>
          );
        })}
      </>,
      document.querySelector(`${stringHelper.className2Classes(areaCtx.className!)} > .x-axis`)!,
    )
  );
};

export default styled(XAxis)``;
