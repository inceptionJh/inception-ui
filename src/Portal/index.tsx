import * as React from "react";
import * as ReactDOM from "react-dom";

import styled from "styled-components";

import { IPotalProps } from "./type";

const Portal: React.FunctionComponent<IPotalProps> = (props) => {
  const target = document.querySelector(props.selector);

  const [render, setRender] = React.useState(false);

  React.useEffect(() => {
    setRender(true);
  }, []);

  if (!render) return null;

  if (target === null) return null;

  return (
    ReactDOM.createPortal(<>{props.children}</>, target)
  );
};

export default styled(Portal)``;
