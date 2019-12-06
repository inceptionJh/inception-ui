import * as React from "react";

import styled from "styled-components";

import { IDefaultInputProps } from "./type";

const DefaultInput: React.FunctionComponent<IDefaultInputProps> = (props) => {
  return (
    <input {...props} />
  );
};

export default styled(DefaultInput)`
  box-sizing: border-box;

  font-size: 14px;
  line-height: 32px;
  height: 32px;
  border: ${(props) => props.border ?? "1px solid #ccc"};
  border-radius: 4px;
  padding: 0 5px;

  outline: none;
`;
