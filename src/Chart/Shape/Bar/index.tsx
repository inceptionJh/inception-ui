import * as React from "react";
import * as ReactDOM from "react-dom";

import * as d3 from "d3";

import styled from "styled-components";

import stringHelper from "../../../utils/string";
import AreaContext from "../../Area/context";
import ShapeContext from "../context";

import { IBarProps } from "./type";

const Bar: React.FunctionComponent<IBarProps> = (props) => {
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
      width: props.width ?? 10,
      fill: props.fill ?? "#777",
      opacity: props.opacity ?? "1",
      xScale: props.xScale ?? xScale,
      yScale: props.yScale ?? yScale,
      onClick: props.onClick ?? (() => undefined),
      onMouseEnter: props.onMouseEnter ?? (() => undefined),
      onMouseLeave: props.onMouseLeave ?? (() => undefined),
    };
  }, [
    props.padding,
    props.xScale,
    props.width,
    props.fill,
    props.opacity,
    props.onClick,
    props.onMouseEnter,
    props.onMouseLeave,
  ]);

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
        type: "bar",
        xScale: attr.xScale,
        yScale: attr.yScale,
        padding: attr.padding,
        width, height,
        xKey: props.xKey, yKey: props.yKey,
        onMouseEnter: attr.onMouseEnter,
        onMouseLeave: attr.onMouseLeave,
      }}>
      {"document" in globalThis ?
        ReactDOM.createPortal((
          <>
            {areaCtx.data.map((v: any, i: number, g: any[]) => {
              return (
                <rect
                  key={`${props.className}-${i}`}
                  className={`${props.className}`}
                  x={`${attr.xScale(v[props.xKey]) - attr.width / 2}px`}
                  y={`${attr.yScale(v[props.yKey])}px`}
                  width={`${attr.width}px`}
                  height={`${areaCtx.height - (attr.padding.top + attr.padding.bottom) - attr.yScale(v[props.yKey])}px`}
                  fill={attr.fill}
                  opacity={attr.opacity}
                  onClick={() => attr.onClick(v, i, g)}
                  onMouseEnter={() => attr.onMouseEnter(v, i, g)}
                  onMouseLeave={() => attr.onMouseLeave(v, i, g)}
                />
              );
            })}
          </>
        ),
          document.querySelector(`${stringHelper.className2Classes(areaCtx.className)} > .data`)!)
        : null
      }
      {props.children}
    </ShapeContext.Provider>
  );
};

export default styled(Bar)`
  cursor: ${(props) => props.cursor};
`;
