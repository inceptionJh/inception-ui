import * as React from "react";
import * as ReactDOM from "react-dom";

import { Chart } from "../src";

const Legend: React.FunctionComponent = () => {
  return (
    <g transform={`translate(310 30)`}>
      {_data.map((d, i) => {
        return (
          <g key={i} transform={`translate(0 ${15 * i})`}>
            <circle r="5" fill={d.color[0]} />
            <text x="8" y="3" fontSize="10">{d.areaSize}</text>
          </g>
        );
      })}
    </g>
  );
};

const _data = [
  { areaSize: 162.6, maxPrice: 1500000, minPrice: 12000000, color: ["#fcc", "#fdd"] },
  { areaSize: 168.6, maxPrice: 5800000, minPrice: 15000000, color: ["#f99", "#fcc"] },
  { areaSize: 179.6, maxPrice: 10500000, minPrice: 12500000, color: ["#f55", "#f99"] },
  { areaSize: 181.6, maxPrice: 17500000, minPrice: 13500000, color: ["#f00", "#f55"] },
  { areaSize: 197.4, maxPrice: 18000000, minPrice: 15000000, color: ["#f00", "#fff"] },
];

const Test: React.FunctionComponent<{ data: any[] }> = (props) => {
  const [data, setData] = React.useState(() => props.data.sort((a, b) => a.maxPrice - b.maxPrice));

  React.useEffect(() => {
    setData(props.data);
  }, [props.data]);

  const width = 500;
  const height = 300;

  const padding = { top: 0, right: 0, bottom: 0, left: 0 };

  return (
    <Chart.Area
      width={width}
      height={height}
      padding={padding}
    >
      <Chart.Legend component={Legend} />
      <Chart.Shape.Pie
        data={data}
        valueKey="maxPrice"
        labelKey="areaSize"
        colorKey="color"
        innerRadius={0.5}
      />
    </Chart.Area>
  );
};

ReactDOM.render(
  <Test data={_data} />,
  document.getElementById("_root"),
);
