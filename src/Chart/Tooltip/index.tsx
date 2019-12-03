import * as React from "react";

import styled from "styled-components";

import AreaContext from "../Area/context";
import ShapeContext from "../Shape/context";

import stringHelper from "../../utils/string";

import { ITooltipProps } from "./type";

const Tooltip: React.FunctionComponent<ITooltipProps> = (props) => {
  const areaCtx = React.useContext(AreaContext);
  const shapeCtx = React.useContext(ShapeContext);

  const [nearData, setNearData] = React.useState(areaCtx.data[0]);
  const [hover, setHover] = React.useState(false);

  const mouseMoveHandler = React.useCallback((e: MouseEvent) => {
    const result = areaCtx.data.reduce((accu: any, curr: any) => {
      const mouse = shapeCtx.xScale.invert(e.offsetX).valueOf();
      return Math.abs(accu[shapeCtx.xKey].valueOf() - mouse) >= Math.abs(curr[shapeCtx.xKey].valueOf() - mouse) ? curr : accu;
    }, areaCtx.data[0]);
    setNearData(result);
  }, []);

  React.useEffect(() => {
    const mouseOverHandler = () => setHover(true);
    const mouseOutHandler = () => setHover(false);
    const svgEl = document.querySelector(`${stringHelper.className2Classes(areaCtx.className)}`) as SVGElement;
    svgEl.addEventListener("mouseover", mouseOverHandler);
    svgEl.addEventListener("mouseout", mouseOutHandler);
    svgEl.addEventListener("mousemove", mouseMoveHandler);
    return () => {
      svgEl.removeEventListener("mouseover", mouseOverHandler);
      svgEl.removeEventListener("mouseout", mouseOutHandler);
      svgEl.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []);

  return (
    <props.component
      className={props.className!}
      nearData={nearData}
      hover={hover}
      x={shapeCtx.xScale(nearData[shapeCtx.xKey])}
      y={shapeCtx.yScale(nearData[shapeCtx.yKey])}
    />
  );
};

export default styled(Tooltip)`

`;
