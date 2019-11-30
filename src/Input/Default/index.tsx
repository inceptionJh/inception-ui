import * as React from "react";

export interface IDefaultInputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
}

const IDefaultInput: React.FunctionComponent<IDefaultInputProps> = (props) => {
  return <input {...props} />;
};

export default IDefaultInput;
