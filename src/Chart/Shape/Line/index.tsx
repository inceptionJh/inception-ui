import * as React from "react";

import * as d3 from "d3";

import styled from "styled-components";

import Portal from "../../../Portal";

import AreaContext from "../../Area/context";
import ShapeContext from "../context";

import stringHelper from "../../../utils/string";
import mapper from "./mapper";

import { ILineProps } from "./type";

const Line: React.FunctionComponent<ILineProps> = (props) => {
  const areaCtx = React.useContext(AreaContext);

  const $ = React.useMemo(() => {
    return {
      type: mapper.type[props.type ?? "linear"],
      stroke: props.stroke ?? "#777",
      strokeWidth: props.strokeWidth ?? "1",
      strokeDasharray: props.strokeDasharray,
      opacity: props.opacity ?? "1",
    };
  }, [
    props.data,
    props.stroke,
    props.strokeWidth,
    props.strokeDasharray,
    props.opacity,
  ]);

  const path = React.useMemo(() => {
    if (props.data.length === 0) return "";
    if (props.data.length === 1) return `M${areaCtx.padding.left}, ${props.yScale(props.data[0][props.yKey])}L${areaCtx.width - areaCtx.padding.right}, ${props.yScale(props.data[props.data.length - 1][props.yKey])}`;

    const pathGenerator = d3.line().curve(d3[$.type]);
    const dataSet = [
      [areaCtx.padding.left, props.data[0][props.yKey]],
      ...props.data.map((d) => [d[props.xKey], d[props.yKey]]),
      [areaCtx.width - areaCtx.padding.right, props.data[props.data.length - 1][props.yKey]],
    ].map((d, i, g) => {
      if (i === 0) return [d[0], props.yScale(d[1])];
      if (i === g.length - 1) return [d[0], props.yScale(d[1])];
      return [props.xScale(d[0]), props.yScale(d[1])];
    }) as [number, number][];
    return pathGenerator(dataSet.slice(props.start === false ? 1 : 0, props.end === false ? dataSet.length - 1 : dataSet.length));
  }, [props.data]);

  const width = areaCtx.width - (areaCtx.padding.left + areaCtx.padding.right);
  const height = areaCtx.height - (areaCtx.padding.top + areaCtx.padding.bottom);

  return (
    <ShapeContext.Provider
      value={{
        type: $.type,
        data: props.data,
        xScale: props.xScale,
        yScale: props.yScale,
        width, height,
        xKey: props.xKey, yKey: props.yKey,
      }}>
      <Portal selector={`${stringHelper.className2Classes(areaCtx.className)} > .data`}>
        <path
          key={`${props.className}`}
          className={`${props.className}`}
          fill="transparent"
          d={path ?? undefined}
          stroke={$.stroke}
          strokeWidth={$.strokeWidth}
          strokeDasharray={$.strokeDasharray}
          opacity={$.opacity}
        />
      </Portal>
      {props.children}
    </ShapeContext.Provider>
  );
};

export default styled(Line)``;
