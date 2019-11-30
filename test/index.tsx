import * as React from "react";
import * as ReactDOM from "react-dom";

import { Input } from "../src";

const Test = () => {
  const [value, setValue] = React.useState("1");

  return (
    <Input.Select.Default.Group value={value} onChange={(v) => setValue(v)}>
      <Input.Select.Default.Item label="item - 1" value="1" />
      <Input.Select.Default.Item label="item - 2" value="2" />
      <Input.Select.Default.Item label="item - 3" value="3" />
    </Input.Select.Default.Group>
  );
};

ReactDOM.render(
  <Test />,
  document.getElementById("_root"),
);
