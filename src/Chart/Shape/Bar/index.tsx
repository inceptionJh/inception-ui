import * as React from "react";

import styled from "styled-components";

import Portal from "../../../Portal";

import AreaContext from "../../Area/context";
import ShapeContext from "../context";

import stringHelper from "../../../utils/string";

import { IBarProps } from "./type";

const Bar: React.FunctionComponent<IBarProps> = (props) => {
  const areaCtx = React.useContext(AreaContext);

  const attr = React.useMemo(() => {
    return {
      width: props.width ?? 10,
      fill: props.fill ?? "#777",
      opacity: props.opacity ?? "1",
      xScale: props.xScale,
      yScale: props.yScale,
      onClick: props.onClick ?? (() => undefined),
      onMouseEnter: props.onMouseEnter ?? (() => undefined),
      onMouseLeave: props.onMouseLeave ?? (() => undefined),
    };
  }, [
    props.data,
    props.xScale,
    props.yScale,
    props.width,
    props.fill,
    props.opacity,
    props.onClick,
    props.onMouseEnter,
    props.onMouseLeave,
  ]);

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
        type: "bar",
        data: props.data,
        xScale: attr.xScale,
        yScale: attr.yScale,
        width, height,
        xKey: props.xKey, yKey: props.yKey,
        onMouseEnter: attr.onMouseEnter,
        onMouseLeave: attr.onMouseLeave,
      }}>
      <Portal selector={`${stringHelper.className2Classes(areaCtx.className)} > .data`}>
        {props.data.map((v: any, i: number, g: any[]) => {
          return (
            <rect
              key={`${props.className}-${i}`}
              className={`${props.className}`}
              x={`${attr.xScale(v[props.xKey]) - attr.width / 2}px`}
              y={`${attr.yScale(v[props.yKey])}px`}
              width={`${attr.width}px`}
              height={`${areaCtx.height - (areaCtx.padding.top + areaCtx.padding.bottom) - attr.yScale(v[props.yKey])}px`}
              fill={attr.fill}
              opacity={attr.opacity}
              onClick={() => attr.onClick(v, i, g)}
              onMouseEnter={() => attr.onMouseEnter(v, i, g)}
              onMouseLeave={() => attr.onMouseLeave(v, i, g)}
            />
          );
        })}
      </Portal>
      {props.children}
    </ShapeContext.Provider>
  );
};

export default styled(Bar)`
  cursor: ${(props) => props.cursor};
`;
