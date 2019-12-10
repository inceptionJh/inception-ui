import * as React from "react";

import styled from "styled-components";

import Portal from "../../Portal";

import ShapeContext from "../Shape/context";
import AreaContext from "../Area/context";

import stringHelper from "../../utils/string";

import { ITooltipProps } from "./type";

const Tooltip: React.FunctionComponent<ITooltipProps> = (props) => {
  const areaCtx = React.useContext(AreaContext);
  const shapeCtx = React.useContext(ShapeContext);

  const [nearData, setNearData] = React.useState(shapeCtx.data[0]);
  const [hover, setHover] = React.useState(false);

  const mouseMoveHandler = React.useCallback((e: MouseEvent) => {
    const result = shapeCtx.data.reduce((accu: any, curr: any) => {
      const mouseX = shapeCtx.xScale.invert(e.offsetX).valueOf();
      const mouseY = shapeCtx.yScale.invert(e.offsetY).valueOf();

      const xDiffAccu = Math.abs(accu[shapeCtx.xKey] - mouseX);
      const xDiffCurr = Math.abs(curr[shapeCtx.xKey] - mouseX);

      const yDiffAccu = Math.abs(accu[shapeCtx.yKey] - mouseY);
      const yDiffCurr = Math.abs(curr[shapeCtx.yKey] - mouseY);

      if (xDiffAccu === xDiffCurr) return yDiffAccu <= yDiffCurr ? accu : curr;
      return xDiffAccu < xDiffCurr ? accu : curr;
    }, shapeCtx.data[0]);
    setNearData(result);
  }, [shapeCtx.data, shapeCtx.xScale, shapeCtx.yScale]);

  const mouseOverHandler = React.useCallback(() => setHover(true), []);
  const mouseOutHandler = React.useCallback(() => setHover(false), []);

  React.useEffect(() => {
    const svgEl = document.querySelector(`${stringHelper.className2Classes(areaCtx.className)}`) as SVGElement;
    svgEl.removeEventListener("mouseover", mouseOverHandler);
    svgEl.removeEventListener("mouseout", mouseOutHandler);
    svgEl.removeEventListener("mousemove", mouseMoveHandler);

    svgEl.addEventListener("mouseover", mouseOverHandler);
    svgEl.addEventListener("mouseout", mouseOutHandler);
    svgEl.addEventListener("mousemove", mouseMoveHandler);
    return () => {
      svgEl.removeEventListener("mouseover", mouseOverHandler);
      svgEl.removeEventListener("mouseout", mouseOutHandler);
      svgEl.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, [mouseMoveHandler]);

  const $ = React.useMemo(() => {
    return {
      xLine: props.xLine ?? true,
      xLineStroke: props.xLineStroke ?? "#888",
      xLineStrokeWidth: props.xLineStrokeWidth ?? "1",
      xLineStrokeDasharray: props.xLineStrokeDasharray ?? "",
      yLine: props.yLine ?? true,
      yLineStroke: props.xLineStroke ?? "#888",
      yLineStrokeWidth: props.xLineStrokeWidth ?? "1",
      yLineStrokeDasharray: props.xLineStrokeDasharray ?? "",
    };
  }, [
    props.xLine,
    props.xLineStroke,
    props.xLineStrokeWidth,
    props.xLineStrokeDasharray,
    props.yLine,
    props.yLineStroke,
    props.yLineStrokeWidth,
    props.yLineStrokeDasharray,
  ]);

  return (
    <>
      <Portal selector={`${stringHelper.className2Classes(areaCtx.className)} > .data-before`}>
        {$.xLine
          ? (
            <line
              x1={shapeCtx.xScale(nearData[shapeCtx.xKey])}
              x2={shapeCtx.xScale(nearData[shapeCtx.xKey])}
              y1={areaCtx.padding.top}
              y2={areaCtx.padding.top + shapeCtx.height}
              stroke="#888"
              opacity={hover ? 1 : 0}
            />
          )
          : null
        }

        {$.yLine
          ? (
            <line
              x1={areaCtx.padding.left}
              x2={areaCtx.padding.left + shapeCtx.width}
              y1={shapeCtx.yScale(nearData[shapeCtx.yKey])}
              y2={shapeCtx.yScale(nearData[shapeCtx.yKey])}
              stroke="#888"
              opacity={hover ? 1 : 0}
            />
          )
          : null
        }
      </Portal>

      <Portal selector={`${stringHelper.className2Classes(areaCtx.className)} > .tooltip`}>
        <props.component
          className={props.className!}
          nearData={nearData}
          hover={hover}
          x={shapeCtx.xScale(nearData[shapeCtx.xKey])}
          y={shapeCtx.yScale(nearData[shapeCtx.yKey])}
        />
      </Portal>
    </>
  );
};

export default styled(Tooltip)``;
