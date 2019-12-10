import * as React from "react";

import shortid from "shortid";

import styled from "styled-components";

import AreaContext from "./context";

import { IChartAreaProps } from "./type";

const Area: React.FunctionComponent<IChartAreaProps> = (props) => {
  const [shortID] = React.useState(shortid.generate());

  const padding = props.padding ?? { top: 0, right: 0, bottom: 0, left: 0 };

  return (
    <AreaContext.Provider
      value={{
        className: `${props.className} _${shortID}`,
        width: props.width,
        height: props.height,
        padding,
      }}
    >
      <svg
        className={`${props.className} _${shortID}`}
        width={props.width}
        height={props.height}
      >
        <g className="grid"></g>
        <g className="x-axis"></g>
        <g className="y-axis"></g>
        <g className="legend"></g>
        <g className="data-before"></g>
        <g className="data"></g>
        <g className="data-after"></g>
        <g className="tooltip"></g>
        {props.children}
      </svg>
    </AreaContext.Provider>
  );
};

export default styled(Area)`
  overflow: visible;
`;
