import * as React from "react";

import styled from "styled-components";

import AreaContext from "./context";

import { IChartAreaProps } from "./type";

const Area: React.FunctionComponent<IChartAreaProps> = (props) => {
  return (
    <AreaContext.Provider
      value={{
        className: props.className!,
        width: props.width,
        height: props.height,
        data: props.data,
      }}
    >
      <svg
        className={props.className}
        width={props.width}
        height={props.height}
      >
        <g className="grid"></g>
        <g className="x-axis"></g>
        <g className="y-axis"></g>
        <g className="data"></g>
        <g className="tooltip"></g>
        {props.children}
      </svg>
    </AreaContext.Provider>
  );
};

export default styled(Area)`
  overflow: visible;
`;
