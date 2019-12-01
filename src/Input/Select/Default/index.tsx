import * as React from "react";

import styled from "styled-components";

import ScrollBar from "../../../ScrollBar";

export interface IDefaultSelectItemProps {
  className?: string;
  label: string;
}

const _Item: React.FunctionComponent<IDefaultSelectItemProps> = (props) => {
  const groupContext = React.useContext(GroupContext);

  return (
    <li
      className={props.className}
      data-select={`${groupContext.label === props.label}`}
      onClick={() => groupContext.onLabelChange(props.label)}
    >
      {props.label}
    </li>
  );
};

const Item = styled(_Item)`
  box-sizing: border-box;
  display: flex;
  align-items: center;

  cursor: pointer;

  height: 32px;
  padding-left: 10px;
  outline: none;

  &:hover {
    background: rgba(0,0,0, 0.05);
  }

  &[data-select=true] {
    background: rgba(0,0,0, 0.08);
  }
`;

const GroupContext = React.createContext({} as IDefaultSelectGroupProps);

export interface IDefaultSelectGroupProps {
  className?: string;
  placehold?: string;
  label: string | null;
  onLabelChange: (value: string) => void;
}

const _Group: React.FunctionComponent<IDefaultSelectGroupProps> = (props) => {
  const [spanFocus, setSpanFocus] = React.useState(false);
  const [ulFocus, setUlFocus] = React.useState(false);
  const [selecting, setSelecting] = React.useState([spanFocus, ulFocus].some((v) => v));

  React.useEffect(() => {
    setSelecting([spanFocus, ulFocus].some((v) => v));
  }, [spanFocus, ulFocus]);

  React.useEffect(() => {
    setSelecting(false);
  }, [props.label]);

  return (
    <GroupContext.Provider value={props}>
      <div
        className={props.className}
        data-selecting={`${selecting}`}
      >
        <span
          tabIndex={1}
          onBlur={() => setSpanFocus(false)}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => setSpanFocus(!spanFocus)}
          onMouseUp={(e) => e.currentTarget.focus()}
        >
          {props.label || props.placehold}
        </span>

        <ul
          tabIndex={2}
          onFocus={() => setUlFocus(true)}
          onBlur={() => setUlFocus(false)}
          onClick={(e) => e.stopPropagation()}
        >
          {props.children}

          <ScrollBar.Default delay={200} />
        </ul>
      </div>
    </GroupContext.Provider>
  );
};

const Group = styled(_Group)`
  box-sizing: border-box;
  position: relative;

  width: 180px;
  height: 32px;
  border-radius: 4px;
  font-size: 14px;

  outline: none;

  color: #444;
  font-weight: bold;

  box-shadow: 0px 2px 10px 3px rgba(0,0,0, 0.2);

  border: none;
  -webkit-appearance: none;
  &::-ms-expand {
    display: none;
  }

  & > span {
    display: flex;
    align-items: center;

    outline: none;
    cursor: pointer;

    color: ${(props) => props.label ? "" : "#aaa"};

    width: 100%;
    height: 100%;

    padding-left: 10px;
  }

  & > ul {
    position: absolute;
    z-index: 10000;
    left: 0;
    bottom: -5px;
    transform: translate(0, 100%);
    transition: max-height 0.2s;

    outline: none;

    overflow-y: auto;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }

    padding: 0;
    margin: 0;
    width: 100%;
    max-height: 0;
    border-radius: 4px;

    background: #fff;

    box-shadow: 0px 5px 5px -3px rgba(0,0,0, 0.2), 0px 8px 10px 1px rgba(0,0,0, 0.14), 0px 3px 14px 2px rgba(0,0,0, 0.12);
  }

  &[data-selecting=true] > ul {
    max-height: 200px;
  }
`;

const DefaultSelect = {
  Group,
  Item,
};

export default DefaultSelect;
