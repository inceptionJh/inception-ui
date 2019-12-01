import * as React from "react";
import * as ReactDOM from "react-dom";

import { Input } from "../src";

const Test = () => {
  const [label, setLabel] = React.useState(null);
  const [search, setSearch] = React.useState("");

  return (
    <>
      <Input.Select.Default.Group
        label={label}
        onLabelChange={(v) => setLabel(v)}
        placehold="select label"
      >
        <Input.Select.Default.Item label="item - 1" />
        <Input.Select.Default.Item label="item - 2" />
        <Input.Select.Default.Item label="item - 3" />
      </Input.Select.Default.Group>

      <Input.Select.Search.Group
        label={label}
        onLabelChange={(v) => setLabel(v)}
        search={search}
        onSearchChange={(s) => setSearch(s)}
        placehold="select label"
      >
        <Input.Select.Search.Item label="item - 1" />
        <Input.Select.Search.Item label="item - 2" />
        <Input.Select.Search.Item label="item - 3" />
      </Input.Select.Search.Group>
    </>
  );
};

ReactDOM.render(
  <Test />,
  document.getElementById("_root"),
);
