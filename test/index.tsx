import * as React from "react";
import * as ReactDOM from "react-dom";

import * as d3 from "d3";

import { Chart } from "../src";

const _data = [
  { areaSize: 162.6, maxPrice: 15000000, minPrice: 12000000 },
  { areaSize: 168.6, maxPrice: 18000000, minPrice: 15000000 },
  { areaSize: 174.6, maxPrice: 17000000, minPrice: 15000000 },
  { areaSize: 179.6, maxPrice: 17500000, minPrice: 12500000 },
  { areaSize: 181.6, maxPrice: 17500000, minPrice: 13500000 },
  { areaSize: 197.4, maxPrice: 18000000, minPrice: 15000000 },
];

const Test: React.FunctionComponent = (props) => {
  const [data, setData] = React.useState(_data);

  const width = 500;
  const height = 500;

  const padding = { top: 0, right: 0, bottom: 30, left: 50 };

  const xDomain = d3.extent(data, (d) => d.areaSize) as [number, number];
  const xRange = [0 + padding.left + 20, width - padding.right - 20];

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
  const yRange = [padding.top + 20, height - padding.bottom - 20];

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
      width={width}
      height={height}
      padding={padding}
    >
      <Chart.Shape.RangeBar
        data={data}
        xKey="areaSize"
        yKey="maxPrice"
        yMinKey="minPrice"
        yMaxKey="maxPrice"
        xScale={xScale}
        yScale={yScale}
      >
        <Chart.Grid xTicks={xTicks} yTicks={yTicks} />
        <Chart.Axis.X ticks={xTicks} />
        <Chart.Axis.Y ticks={yTicks} />
      </Chart.Shape.RangeBar>
    </Chart.Area>
  );
};

ReactDOM.render(
  <Test />,
  document.getElementById("_root"),
);
