import * as React from "react";

import styled from "styled-components";

import Portal from "../../../Portal";

import AreaContext from "../../Area/context";
import ShapeContext from "../context";

import stringHelper from "../../../utils/string";

import { IBarProps } from "./type";

const Bar: React.FunctionComponent<IBarProps> = (props) => {
  const areaCtx = React.useContext(AreaContext);

  const $ = React.useMemo(() => {
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

  return (
    <ShapeContext.Provider
      value={{
        type: "bar",
        data: props.data,
        xScale: $.xScale,
        yScale: $.yScale,
        width, height,
        xKey: props.xKey, yKey: props.yKey,
        onMouseEnter: $.onMouseEnter,
        onMouseLeave: $.onMouseLeave,
      }}>
      <Portal selector={`${stringHelper.className2Classes(areaCtx.className)} > .data`}>
        {props.data.map((v: any, i: number, g: any[]) => {
          const barHeight = Math.abs($.yScale.range()[0] - $.yScale.range()[1]) - Math.abs($.yScale.range()[0] - $.yScale(v[props.yKey]));

          return (
            <rect
              key={`${props.className}-${i}`}
              className={`${props.className}`}
              x={`${$.xScale(v[props.xKey]) - $.width / 2}px`}
              y={`${$.yScale(v[props.yKey])}px`}
              width={`${$.width}px`}
              height={`${barHeight}px`}
              fill={$.fill}
              opacity={$.opacity}
              onClick={() => $.onClick(v, i, g)}
              onMouseEnter={() => $.onMouseEnter(v, i, g)}
              onMouseLeave={() => $.onMouseLeave(v, i, g)}
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
