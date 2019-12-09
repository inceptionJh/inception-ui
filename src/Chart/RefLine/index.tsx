import * as React from "react";

import styled from "styled-components";

import Portal from "../../Portal";

import AreaContext from "../Area/context";
import ShapeContext from "../Shape/context";

import stringHelper from "../../utils/string";

import { IChartRefLineProps } from "./type";

const RefLine: React.FunctionComponent<IChartRefLineProps> = (props) => {
  const areaCtx = React.useContext(AreaContext);
  const shapeCtx = React.useContext(ShapeContext);

  const $ = React.useMemo(() => {
    return {
      stroke: props.stroke ?? "#888",
      strokeWidth: props.strokeWidth ?? "2",
      strokeDasharray: props.strokeDasharray,
      opacity: props.opacity ?? 1,
    };
  }, [
    props.stroke,
    props.strokeWidth,
    props.strokeDasharray,
    props.opacity,
  ]);

  return (
    <Portal selector={`${stringHelper.className2Classes(areaCtx.className)} > .data-before`}>
      <line
        x1={areaCtx.padding.left}
        y1={shapeCtx.yScale(props.a * shapeCtx.xScale.invert(areaCtx.padding.left) + props.b)}
        x2={areaCtx.padding.left + shapeCtx.width}
        y2={shapeCtx.yScale(props.a * shapeCtx.xScale.invert(areaCtx.padding.left + shapeCtx.width) + props.b)}
        stroke={$.stroke}
        strokeWidth={$.strokeWidth}
        strokeDasharray={$.strokeDasharray}
        opacity={$.opacity}
      />
    </Portal>
  );
};

export default styled(RefLine)``;
