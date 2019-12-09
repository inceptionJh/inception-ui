import * as React from "react";
import * as ReactDOM from "react-dom";

import * as d3 from "d3";

import { Chart } from "../src";

import { ITooltipComponentProps } from "../src/Chart/Tooltip/type";

const Tootip: React.FunctionComponent<ITooltipComponentProps> = (props) => {
  return (
    <>
      <g transform={`translate(${props.x} ${props.y})`} opacity={props.hover ? 1 : 0}>
        <circle r={5} fill="#0071e2" stroke="#0071e2" strokeWidth="2" />
        <rect x="-30" y="10" width="60" height="20" stroke="#0071e2" fill="#fff" rx="10" ry="10" />
        <text y="21" fill="#0071e2" textAnchor="middle" dominantBaseline="middle" fontSize="10">{(props.nearData.price / 10000).toLocaleString()} 만원</text>
      </g>
      <text
        transform={`translate(${props.x} ${470})`}
        y={5}
        fontSize="10"
        textAnchor="middle"
        dominantBaseline="hanging"
      >
        {props.nearData.areaSize}㎡
      </text>
    </>
  );
};

const data1 = [
  { areaSize: 162.6, price: 15000000 },
  { areaSize: 168.6, price: 18000000 },
  { areaSize: 174.6, price: 17000000 },
  { areaSize: 179.6, price: 17500000 },
  { areaSize: 181.6, price: 17500000 },
  { areaSize: 197.4, price: 18000000 },
];

const Test: React.FunctionComponent = (props) => {
  const [data, setData] = React.useState(data1);

  const padding = { top: 0, right: 0, bottom: 30, left: 50 };

  const xDomain = d3.extent(data, (d) => d.areaSize) as [number, number];
  const xRange = [0 + padding.left, 500 - padding.right];

  const xScale = d3.scaleLinear();
  xScale.domain(xDomain);
  xScale.range(xRange);

  const xTicks = React.useMemo(() => {
    return d3.extent(data, (d) => d.areaSize) as [number, number];
  }, [data]);

  const [yMin, yMax] = [10000000, 20000000];
  const yDiff = yMax - yMin;
  const yGap = Math.round(yDiff / 5 / Math.pow(10, `${yDiff}`.length - 2)) * Math.pow(10, `${yDiff}`.length - 2);
  const yDomain = [yMax + yGap, yMin - yGap] as [number, number];
  const yRange = [padding.top + 20, 500 - padding.bottom - 20];

  const yTicks = React.useMemo(() => {
    const ticks = [] as number[];
    for (let tick = yDomain[1]; tick <= yDomain[0];) {
      ticks.push(tick);
      tick += yGap;
    }
    return ticks;
  }, [data]);

  const yScale = d3.scaleLinear();
  yScale.domain(yDomain);
  yScale.range(yRange);

  return (
    <Chart.Area
      width={500}
      height={500}
      padding={padding}
    >

      <Chart.Shape.Scatter
        data={data}
        xKey="areaSize"
        yKey="price"
        xScale={xScale}
        yScale={yScale}
        r="5"
        stroke="#a7c3de"
        strokeWidth="2"
        fill="#fff"
      >
        <Chart.Tooltip yLine={false} component={(p) => <Tootip {...p} />} />

        <Chart.Grid
          xTicks={xTicks}
          yTicks={yTicks}
        />
        <Chart.Axis.X
          ticks={xTicks}
          tickFormat={(d) => `${d}㎡`}
        />
        <Chart.Axis.Y
          ticks={yTicks}
          tickFormat={(d: number) => `${(d / 10000000).toLocaleString()}억`}
        />
        <Chart.RefLine
          a={40229.88505747126}
          b={10000000}
          stroke="#0071e2"
        />
      </Chart.Shape.Scatter>
    </Chart.Area>
  );
};

ReactDOM.render(
  <Test />,
  document.getElementById("_root"),
);
