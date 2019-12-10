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

  const path = React.useMemo(() => {
    return d3.line().x((d) => $.xScale(d[0])).y((d) => $.yScale(d[1])).curve(d3[$.type])(props.data.map((d) => [d[props.xKey], d[props.yKey]] as [number, number]));
  }, [props.data]);

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
        type: $.type,
        data: props.data,
        xScale: $.xScale,
        yScale: $.yScale,
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
