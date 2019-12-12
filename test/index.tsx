import * as React from "react";
import * as ReactDOM from "react-dom";

import * as d3 from "d3";

import utils from "./utils";

import { Chart } from "../src";

const _realData = [
  { x: utils.quarterToDate("2018-1Q").valueOf(), y: 6500000 },
  { x: utils.quarterToDate("2018-2Q").valueOf(), y: 5800000 },
  { x: utils.quarterToDate("2018-3Q").valueOf(), y: 10500000 },
  { x: utils.quarterToDate("2018-4Q").valueOf(), y: 17500000 },
  { x: utils.quarterToDate("2019-1Q").valueOf(), y: 18000000 },
];

const _priceData = _realData.map((v) => ({ ...v, y: v.y * (0.8 + ((Math.random() - 0.5) * 0.3)) }));

const Test: React.FunctionComponent<{ data: { price: { list: { x: number, y: number }[] }, real: { list: { x: number, y: number }[] } } }> = (props) => {
  const realData = React.useMemo(() => props.data.real.list, [props.data.real.list]);
  const priceData = React.useMemo(() => props.data.price.list, [props.data.price.list]);

  const width = 500;
  const height = 300;

  const padding = { top: 0, right: 0, bottom: 30, left: 40 };

  const [xMin, xMax] = React.useMemo(() => {
    return d3.extent([...realData.map((d) => d.x), ...priceData.map((d) => d.x)]);
  }, [realData, priceData]);

  const xTicks = React.useMemo(() => {
    return d3.utcMonths(new Date(xMin), new Date(xMax), 3).concat(new Date(xMax)).map((d) => d.valueOf());
  }, [xMin, xMax]);

  const xDomain: [number, number] = [xMin, xMax];

  const xLeftOffset = 20;
  const xRightOffset = 20;

  const xRange: [number, number] = [
    padding.left + xLeftOffset,
    width - (padding.right + xRightOffset),
  ];

  const xScale = d3.scaleLinear();
  xScale.domain(xDomain);
  xScale.range(xRange);

  const [yMin, yMax] = React.useMemo(() => {
    return d3.extent([...realData.map((d) => d.y), ...priceData.map((d) => d.y)]);
  }, []);

  const yDomain: [number, number] = React.useMemo(() => {
    return utils.convertNiceDomain([yMin, yMax]);
  }, [yMin, yMax]);

  const yGap = React.useMemo(() => {
    return utils.convertNiceGap([yMin, yMax]);
  }, [...yDomain]);

  const yTicks = React.useMemo(() => {
    return utils.generateNiceTicks(yGap, yDomain);
  }, [props.data]);

  const yTopOffset = 20;
  const yBottomOffset = 20;

  const yRange = [padding.top + yTopOffset, height - (padding.bottom + yBottomOffset)] as [number, number];

  const yScale = d3.scaleLinear();
  yScale.domain(yDomain.slice().reverse());
  yScale.range(yRange);

  return (
    <Chart.Area
      width={width}
      height={height}
      padding={padding}
    >
      <Chart.Shape.Line
        data={realData}
        type="monotone-x"
        xKey="x"
        yKey="y"
        xScale={xScale}
        yScale={yScale}
        stroke="#fe4e4e"
        strokeWidth="2"
      >
        <Chart.Grid xTicks={xTicks} yTicks={yTicks} />
        <Chart.Axis.X ticks={xTicks} tickFormat={(d) => utils.dateToQuarter(new Date(d))} />
        <Chart.Axis.Y ticks={yTicks} tickFormat={(d) => `${(d / 10000).toLocaleString()}만`} />
      </Chart.Shape.Line>

      <Chart.Shape.Line
        data={priceData}
        type="monotone-x"
        xKey="x"
        yKey="y"
        xScale={xScale}
        yScale={yScale}
        stroke="#0071e2"
        strokeWidth="2"
      />
    </Chart.Area>
  );
};

ReactDOM.render(
  <Test
    data={{
      price: { list: _priceData },
      real: { list: _realData },
    }}
  />,
  document.getElementById("_root"),
);
