import * as React from "react";

import styled from "styled-components";

export interface IDefaultInputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  border?: string;
}

const _DefaultInput: React.FunctionComponent<IDefaultInputProps> = (props) => {
  return (
    <input {...props} />
  );
};

const IDefaultInput = styled(_DefaultInput)`
  box-sizing: border-box;

  font-size: 14px;
  line-height: 32px;
  height: 32px;
  border: ${(props) => props.border ?? "1px solid #ccc"};
  border-radius: 4px;
  padding: 0 5px;

  outline: none;
`;

export default IDefaultInput;
