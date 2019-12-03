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

const data1 = [
  { date: new Date(`2018-01-01`), price: 150000000 },
  { date: new Date(`2018-02-01`), price: 180000000 },
  { date: new Date(`2018-03-01`), price: 170000000 },
  { date: new Date(`2018-04-01`), price: 175000000 },
  { date: new Date(`2018-05-01`), price: 175000000 },
  { date: new Date(`2018-06-01`), price: 180000000 },
].map((v) => ({ ...v, date: v.date.valueOf() }));

const data2 = data1.map((v) => ({ ...v, price: v.price * 0.8 }));

const Test = () => {
  const padding = { top: 0, right: 0, bottom: 30, left: 50 };

  const startDate = new Date(data1[0].date);
  startDate.setMonth(startDate.getMonth() - 1);

  const endDate = new Date(data1[data1.length - 1].date);
  endDate.setMonth(endDate.getMonth() + 1);

  const xDomain = [data1[0].date, data1[data1.length - 1].date];
  const xRange = [0 + padding.left + 20, 500 - padding.right - 20];

  const xScale = d3.scaleLinear();
  xScale.domain(xDomain);
  xScale.range(xRange);

  const xTicks = React.useMemo(() => {
    return dateHelper.generateDateList(new Date(data1[0].date), new Date(data1[data1.length - 1].date), "month").map((v) => v.valueOf());
  }, [data1]);

  const [yMin, yMax] = [100000000, 200000000];
  // const [yMin, yMax] = d3.extent(data.map((v) => v.price));
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
  }, [data1]);

  const yScale = d3.scaleLinear();
  yScale.domain(yDomain);
  yScale.range(yRange);

  return (
    <Chart.Area
      width={500}
      height={500}
      padding={padding}
    >
      <Chart.Shape.StepLine
        data={data1}
        xKey="date"
        yKey="price"
        xScale={xScale}
        yScale={yScale}
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
        <Chart.Tooltip component={(p) => <Tootip {...p} />} />
      </Chart.Shape.StepLine>

      <Chart.Shape.StepLine
        data={data2}
        xKey="date"
        yKey="price"
        xScale={xScale}
        yScale={yScale}
      />
    </Chart.Area>
  );
};

ReactDOM.render(
  <Test />,
  document.getElementById("_root"),
);
