import * as React from "react";

import styled from "styled-components";

import Portal from "../../../Portal";

import ShapeContext from "../../Shape/context";
import AreaContext from "../../Area/context";

import stringHelper from "../../../utils/string";

import { IXAxisProps } from "./type";

const XAxis: React.FunctionComponent<IXAxisProps> = (props) => {
  const areaCtx = React.useContext(AreaContext);
  const shapeCtx = React.useContext(ShapeContext);

  return (
    <Portal selector={`${stringHelper.className2Classes(areaCtx.className!)} > .x-axis`}>
      <path d={`M${areaCtx.padding.left} ${areaCtx.padding.top + shapeCtx.height}, l${shapeCtx.width} 0`} stroke="#000" />
      {props.ticks.map((v: any, i: number, g: any[]) => {
        return (
          <g
            key={`${props.className}-${i}`}
            transform={`translate(${shapeCtx.xScale(v)} ${areaCtx.padding.top + shapeCtx.height})`}
          >
            <line y2="5" stroke="#000" />
            <text
              y="15"
              textAnchor="middle"
              fontSize="10"
            >
              {props.tickFormat ? props.tickFormat(v, i, g.map((t) => t)) : v.valueOf()}
            </text>
          </g>
        );
      })}
    </Portal>
  );
};

export default styled(XAxis)``;
