import * as React from "react";
import * as ReactDOM from "react-dom";

import styled from "styled-components";

import { IPotalProps } from "./type";

const Potal: React.FunctionComponent<IPotalProps> = (props) => {
  return (
    ReactDOM.createPortal(
      <>{props.children}</>,
      document.querySelector(props.selector)!,
    )
  );
};

export default styled(Potal)``;
