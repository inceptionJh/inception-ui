import * as React from "react";

import styled from "styled-components";

import Portal from "../../Portal";

import AreaContext from "../Area/context";

import stringHelper from "../../utils/string";

import { IChartOverlayProps } from "./type";

const Overlay: React.FunctionComponent<IChartOverlayProps> = (props) => {
  const areaCtx = React.useContext(AreaContext);

  return (
    <Portal selector={`${stringHelper.className2Classes(areaCtx.className)} > .overlay`}>
      <props.component />
    </Portal>
  );
};

export default styled(Overlay)``;
