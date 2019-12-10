import * as React from "react";

import styled from "styled-components";

import Portal from "../../Portal";

import AreaContext from "../Area/context";

import stringHelper from "../../utils/string";

import { IChartLegendProps } from "./type";

const Legend: React.FunctionComponent<IChartLegendProps> = (props) => {
  const areaCtx = React.useContext(AreaContext);

  return (
    <Portal selector={`${stringHelper.className2Classes(areaCtx.className)} > .legend`}>
      <props.component />
    </Portal>
  );
};

export default styled(Legend)``;
