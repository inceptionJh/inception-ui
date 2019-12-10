import * as React from "react";

import styled from "styled-components";

import Portal from "../../../Portal";

import AreaContext from "../../Area/context";
import ShapeContext from "../context";

import stringHelper from "../../../utils/string";

import { IScatterProps } from "./type";

const Scatter: React.FunctionComponent<IScatterProps> = (props) => {
  const areaCtx = React.useContext(AreaContext);

  const attr = React.useMemo(() => {
    return {
      r: props.r ?? "2",
      fill: props.fill ?? "#777",
      stroke: props.stroke ?? "#777",
      strokeWidth: props.strokeWidth ?? "1",
      strokeDasharray: props.strokeDasharray,
      opacity: props.opacity ?? "1",
      xScale: props.xScale,
      yScale: props.yScale,
    };
  }, [
    props.data,
    props.r,
    props.fill,
    props.stroke,
    props.strokeWidth,
    props.strokeDasharray,
    props.opacity,
    props.xScale,
    props.yScale,
  ]);

  const width = areaCtx.width - (areaCtx.padding.left + areaCtx.padding.right);
  const height = areaCtx.height - (areaCtx.padding.top + areaCtx.padding.bottom);

  return (
    <ShapeContext.Provider
      value={{
        type: "scatter",
        data: props.data,
        xScale: attr.xScale,
        yScale: attr.yScale,
        width, height,
        xKey: props.xKey, yKey: props.yKey,
      }}>
      <Portal selector={`${stringHelper.className2Classes(areaCtx.className)} > .data`}>
        {props.data.map((d, i) => {
          return (
            <circle
              key={`${props.className}-${i}`}
              className={`${props.className}`}
              cx={props.xScale(d[props.xKey])}
              cy={props.yScale(d[props.yKey])}
              r={attr.r}
              fill={attr.fill}
              stroke={attr.stroke}
              strokeWidth={attr.strokeWidth}
              strokeDasharray={attr.strokeDasharray}
              opacity={attr.opacity}
            />
          );
        })}
      </Portal>
      {props.children}
    </ShapeContext.Provider>
  );
};

export default styled(Scatter)``;
