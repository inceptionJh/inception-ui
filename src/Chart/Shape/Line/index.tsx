import * as React from "react";
import * as ReactDOM from "react-dom";

import * as d3 from "d3";

import styled from "styled-components";

import AreaContext from "../../Area/context";
import ShapeContext from "../context";

import stringHelper from "../../../utils/string";

import { ILineProps } from "./type";

const Line: React.FunctionComponent<ILineProps> = (props) => {
  const areaCtx = React.useContext(AreaContext);

  const attr = React.useMemo(() => {
    const padding = props.padding ?? { top: 0, right: 0, bottom: 0, left: 0 };

    const xDomain = d3.extent(areaCtx.data, (d: any) => d[props.xKey] as number) as [number, number];
    const xRange = [0 + padding.left, areaCtx.width - padding.right];
    const xScale = d3.scaleLinear();
    xScale.range(xRange);
    xScale.domain(xDomain);

    const yMax = d3.max(areaCtx.data, (d: any) => d[props.yKey] as number) as number;
    const yDomain = [yMax, 0];
    const yRange = [0 + padding.top, areaCtx.height - padding.bottom];
    const yScale = d3.scaleLinear();
    yScale.range(yRange);
    yScale.domain(yDomain);

    return {
      padding,
      stroke: props.stroke ?? "#777",
      strokeWidth: props.strokeWidth ?? "1",
      strokeDasharray: props.strokeDasharray,
      opacity: props.opacity ?? "1",
      xScale: props.xScale ?? xScale,
      yScale: props.yScale ?? yScale,
    };
  }, [
    areaCtx.data,
    props.padding,
    props.stroke,
    props.strokeWidth,
    props.strokeDasharray,
    props.opacity,
    props.xScale,
    props.yScale,
  ]);

  const path = areaCtx.data.map((d: any, i: number) => {
    return `${i === 0 ? "M" : "L"}${attr.xScale(d[props.xKey])} ${attr.yScale(d[props.yKey])}`;
  }).join(",");

  const width = areaCtx.width - (attr.padding.left + attr.padding.right);
  const height = areaCtx.height - (attr.padding.top + attr.padding.bottom);

  const [render, setRender] = React.useState(false);

  React.useEffect(() => {
    setRender(true);
  }, []);

  if (!render) return null;

  return (
    <ShapeContext.Provider
      value={{
        type: "line",
        xScale: attr.xScale,
        yScale: attr.yScale,
        padding: attr.padding,
        width, height,
        xKey: props.xKey, yKey: props.yKey,
      }}>
      {"document" in globalThis ?
        ReactDOM.createPortal((
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
        ),
          document.querySelector(`${stringHelper.className2Classes(areaCtx.className)} > .data`)!)
        : null
      }
      {props.children}
    </ShapeContext.Provider>
  );
};

export default styled(Line)`
`;
