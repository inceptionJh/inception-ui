import * as React from "react";
import * as ReactDOM from "react-dom";

import * as d3 from "d3";

import { Chart } from "../src";

import dateHelper from "../src/utils/date";

import { ITooltipComponentProps } from "../src/Chart/Tooltip/type";

const Tootip: React.FunctionComponent<ITooltipComponentProps> = (props) => {
  return (
    <g transform={`translate(${props.x} ${props.y})`} opacity={props.hover ? 1 : 0}>
      <text>test</text>
    </g>
  );
};

const data = [
  { date: new Date(`2018-01-01`), price: 100000000, amount: 1 },
  { date: new Date(`2018-02-01`), price: 120000000, amount: 2 },
  { date: new Date(`2018-03-01`), price: 140000000, amount: 6 },
  { date: new Date(`2018-04-01`), price: 160000000, amount: 6 },
  { date: new Date(`2018-05-01`), price: 170000000, amount: 5 },
  { date: new Date(`2018-06-01`), price: 180000000, amount: 2 },
].map((v) => ({ ...v, date: v.date.valueOf() }));

const Test = () => {
  const padding = { top: 0, right: 0, bottom: 30, left: 50 };

  const startDate = new Date(data[0].date);
  startDate.setMonth(startDate.getMonth() - 1);

  const endDate = new Date(data[data.length - 1].date);
  endDate.setMonth(endDate.getMonth() + 1);

  const xDiff = endDate.valueOf() - startDate.valueOf();
  const xGap = xDiff * 0.1;
  const xDomain = [data[0].date - xGap, data[data.length - 1].date + xGap];
  const xRange = [0 + padding.left, 500 - padding.right];

  const xScale = d3.scaleLinear();
  xScale.domain(xDomain);
  xScale.range(xRange);

  const xTicks = React.useMemo(() => {
    return dateHelper.generateDateList(new Date(data[0].date), new Date(data[data.length - 1].date), "month").map((v) => v.valueOf());
  }, [data]);

  const [yMin, yMax] = d3.extent(data.map((v) => v.price));
  const yDiff = yMax - yMin;
  const yGap = Math.round(yDiff * 0.2 / Math.pow(10, `${yDiff}`.length - 2)) * Math.pow(10, `${yDiff}`.length - 2);
  const yDomain = [yMax + yGap, yMin - yGap] as [number, number];
  const yRange = [padding.top, 500 - padding.bottom];

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
      data={data}
    >
      <Chart.Shape.Line
        xKey="date"
        yKey="price"
        xScale={xScale}
        yScale={yScale}
        padding={padding}
      >
        <Chart.Grid
          xTicks={xTicks}
          yTicks={yTicks}
        />
        <Chart.Axis.X
          ticks={xTicks}
          tickFormat={(d) => new Date(d).toJSON().slice(0, 7)}
        />
        <Chart.Axis.Y
          ticks={yTicks}
        />
        <Chart.Tooltip component={Tootip} />
      </Chart.Shape.Line>
    </Chart.Area>
  );
};

ReactDOM.render(
  <Test />,
  document.getElementById("_root"),
);
