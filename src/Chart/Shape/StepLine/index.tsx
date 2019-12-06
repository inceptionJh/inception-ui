import * as React from "react";

import styled from "styled-components";

import Portal from "../../../Portal";

import AreaContext from "../../Area/context";
import ShapeContext from "../context";

import stringHelper from "../../../utils/string";

import { IStepLineProps } from "./type";

const Line: React.FunctionComponent<IStepLineProps> = (props) => {
  const areaCtx = React.useContext(AreaContext);

  const attr = React.useMemo(() => {
    return {
      stroke: props.stroke ?? "#777",
      strokeWidth: props.strokeWidth ?? "1",
      strokeDasharray: props.strokeDasharray,
      opacity: props.opacity ?? "1",
      xScale: props.xScale,
      yScale: props.yScale,
    };
  }, [
    props.data,
    props.stroke,
    props.strokeWidth,
    props.strokeDasharray,
    props.opacity,
    props.xScale,
    props.yScale,
  ]);

  const path = (() => {
    if (props.data.length === 0) return "";

    if (props.data.length === 1) return `M${areaCtx.padding.left} ${attr.yScale(props.data[0][props.yKey])},L${attr.xScale(props.data[0][props.xKey])} ${attr.yScale(props.data[0][props.yKey])},L${areaCtx.width - areaCtx.padding.right} ${attr.yScale(props.data[0][props.yKey])}`;

    return props.data.map((d: any, i: number, g: any[]) => {
      switch (i) {
        case 0:
          return `M${areaCtx.padding.left} ${attr.yScale(d[props.yKey])},L${attr.xScale(d[props.xKey])} ${attr.yScale(d[props.yKey])}`;

        case g.length - 1:
          return `L${attr.xScale(d[props.xKey])} ${attr.yScale(g[i - 1][props.yKey])},L${attr.xScale(d[props.xKey])} ${attr.yScale(d[props.yKey])},L${areaCtx.width - areaCtx.padding.right} ${attr.yScale(d[props.yKey])}`;

        default:
          return `L${attr.xScale(d[props.xKey])} ${attr.yScale(g[i - 1][props.yKey])},L${attr.xScale(d[props.xKey])} ${attr.yScale(d[props.yKey])}`;
      }
    }).join(",");
  })();

  const width = areaCtx.width - (areaCtx.padding.left + areaCtx.padding.right);
  const height = areaCtx.height - (areaCtx.padding.top + areaCtx.padding.bottom);

  const [render, setRender] = React.useState(false);

  React.useEffect(() => {
    setRender(true);
  }, []);

  if (!render) return null;

  return (
    <ShapeContext.Provider
      value={{
        type: "step-line",
        data: props.data,
        xScale: attr.xScale,
        yScale: attr.yScale,
        width, height,
        xKey: props.xKey, yKey: props.yKey,
      }}>
      <Portal selector={`${stringHelper.className2Classes(areaCtx.className)} > .data`}>
        <path
          key={`${props.className}`}
          className={`${props.className}`}
          fill="transparent"
          d={path}
          stroke={attr.stroke}
          strokeWidth={attr.strokeWidth}
          strokeDasharray={attr.strokeDasharray}
          opacity={attr.opacity}
        />
      </Portal>
      {props.children}
    </ShapeContext.Provider>
  );
};

export default styled(Line)``;
