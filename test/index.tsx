import "./style.css";

import * as React from "react";
import * as ReactDOM from "react-dom";

import styled from "styled-components";

import { ScrollBar } from "../src";

const _Test: React.FunctionComponent<{ className?: string }> = (props) => {
  const [create, setCreate] = React.useState(false);

  React.useEffect(() => {
    setCreate(true);
  }, []);

  return (
    <div className={props.className}>
      <div className="parent">
        <div className="child"></div>
        {create ? <div className="child"></div> : null}
        <ScrollBar.Default />
      </div>
    </div>
  );
};

const Test = styled(_Test)`
  padding: 100px;

  .parent, .child {
    border: 1px solid;
  }

  .parent {
    position: relative;
    width: 100px;
    height: 200px;
    overflow: auto;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none !important;
    }
  }

  .child {
    width: 100%;
    height: 500px;
  }
`;

ReactDOM.render(
  <Test />,
  document.getElementById("_root"),
);
