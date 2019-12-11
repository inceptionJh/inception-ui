import * as React from "react";

import * as d3 from "d3";

import styled from "styled-components";

import Portal from "../../../Portal";

import AreaContext from "../../Area/context";

import stringHelper from "../../../utils/string";

import { IPieProps } from "./type";

const Pie: React.FunctionComponent<IPieProps> = (props) => {
  const areaCtx = React.useContext(AreaContext);

  const $ = React.useMemo(() => {
    const shapeWidth = areaCtx.width - (areaCtx.padding.left + areaCtx.padding.right);
    const shapeHeight = areaCtx.height - (areaCtx.padding.top + areaCtx.padding.bottom);
    const size = (shapeWidth < shapeHeight ? shapeWidth : shapeHeight) / 2;

    const pieGenerator = d3.pie();
    pieGenerator.value((d: any) => d[props.valueKey]);
    pieGenerator.padAngle(props.padAngle ?? 0.05);

    const pie = pieGenerator(props.data);

    const arcGenerator = d3.arc();
    const arcs = pie.map((arc) => {
      return arcGenerator({
        startAngle: arc.startAngle,
        endAngle: arc.endAngle,
        padAngle: arc.padAngle,
        innerRadius: size * (props.innerRadius ?? 0),
        outerRadius: size,
      });
    });

    return {
      shapeWidth,
      shapeHeight,
      size,
      pie,
      arcs,
    };
  }, [
    areaCtx.width,
    areaCtx.height,
    areaCtx.padding,
    props.labelKey,
    props.valueKey,
    props.padAngle,
  ]);

  return (
    <>
      <Portal selector={`${stringHelper.className2Classes(areaCtx.className)} > defs`}>
        {$.pie.map((d: any, i) => {
          const color = d.data[props.colorKey!];
          if (typeof color === "string") {
            const $color = d.data[props.colorKey!];
            return (
              <linearGradient key={i} id={`pie-gradient-${i}`} x1="0%" x2="0%" y1="0%" y2="100%">
                <stop offset="0%" stopColor={$color} />
                <stop offset="100%" stopColor={$color} />
              </linearGradient>
            );
          }

          if (color instanceof Array) {
            const $colors = d.data[props.colorKey!];
            return (
              <linearGradient key={i} id={`pie-gradient-${i}`} x1="0%" x2="0%" y1="0%" y2="100%">
                {$colors.map(($color: string, j: number, colorGroup: string[]) => {
                  return <stop key={j} offset={j / colorGroup.length} stopColor={$color} />;
                })}
              </linearGradient>
            );
          }

          return (
            <linearGradient key={i} id={`pie-gradient-${i}`} x1="0%" x2="0%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#ccc" />
              <stop offset="100%" stopColor="#ccc" />
            </linearGradient>
          );
        })}
      </Portal>

      <Portal selector={`${stringHelper.className2Classes(areaCtx.className)} > .data`}>
        <g className={props.className} transform={`translate(${areaCtx.padding.left + $.size} ${areaCtx.padding.top + $.size})`}>
          {$.arcs.map((path, i) => {
            return (
              <path
                key={`${stringHelper.className2Classes(props.className!)}-${i}`}
                d={path ?? ""}
                fill={`url('#pie-gradient-${i}')`}
              />
            );
          })}
        </g>
      </Portal>
    </>
  );
};

export default styled(Pie)``;
