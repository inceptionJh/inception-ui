import * as React from "react";
import * as ReactDOM from "react-dom";

import styled from "styled-components";

import stringHelper from "../../utils/string";
import ShapeContext from "../Shape/context";
import AreaContext from "../Area/context";

import { IGridProps } from "./type";

const Grid: React.FunctionComponent<IGridProps> = (props) => {
  const areaCtx = React.useContext(AreaContext);
  const shapeCtx = React.useContext(ShapeContext);

  const attr = React.useMemo(() => {
    return {
      xTicks: props.xTicks ?? shapeCtx.data.map((v: any) => v[shapeCtx.xKey]) as number[],
      xLine: props.xLine ?? true,
      xStroke: props.xStroke ?? "#ccc",
      xStrokeWidth: props.xStrokeWidth ?? "1",
      xStrokeDasharray: props.xStrokeDasharray ?? "3 3",
      xStrokeOpacity: props.xStrokeOpacity ?? "1",
      yTicks: props.yTicks ?? shapeCtx.data.map((v: any) => v[shapeCtx.yKey]) as number[],
      yLine: props.yLine ?? true,
      yStroke: props.yStroke ?? "#ccc",
      yStrokeWidth: props.yStrokeWidth ?? "1",
      yStrokeDasharray: props.yStrokeDasharray ?? "3 3",
      yStrokeOpacity: props.yStrokeOpacity ?? "1",
    };
  }, [
    shapeCtx.data,
    props.xTicks,
    props.xLine,
    props.xStroke,
    props.xStrokeWidth,
    props.xStrokeDasharray,
    props.xStrokeOpacity,
    props.yLine,
    props.yStroke,
    props.yStrokeWidth,
    props.yStrokeDasharray,
    props.yStrokeOpacity,
  ]);

  const [render, setRender] = React.useState(false);

  React.useEffect(() => {
    setRender(true);
  }, []);

  if (!render) return null;

  return (
    ReactDOM.createPortal(
      <>
        {attr.xLine
          ? attr.xTicks.map((v: any, i: number, g: any[]) => {
            return (
              <line
                key={i}
                transform={`translate(${shapeCtx.xScale(v)} ${areaCtx.padding.top + shapeCtx.height})`}
                y2={-shapeCtx.height}
                stroke={attr.xStroke}
                strokeWidth={attr.xStrokeWidth}
                strokeDasharray={attr.xStrokeDasharray}
                strokeOpacity={attr.xStrokeOpacity}
              />
            );
          })
          : null
        }

        {attr.yLine
          ? attr.yTicks.map((v: any, i: number, g: any[]) => {
            return (
              <line
                key={i}
                transform={`translate(${areaCtx.padding.left} ${shapeCtx.yScale(v)})`}
                x2={shapeCtx.width}
                stroke={attr.yStroke}
                strokeWidth={attr.yStrokeWidth}
                strokeDasharray={attr.yStrokeDasharray}
                strokeOpacity={attr.yStrokeOpacity}
              />
            );
          })
          : null
        }
      </>,
      document.querySelector(`${stringHelper.className2Classes(areaCtx.className!)} > .grid`)!,
    )
  );
};

export default styled(Grid)``;
