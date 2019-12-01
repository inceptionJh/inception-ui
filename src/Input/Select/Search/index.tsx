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
      data-select={props.label === groupContext.label}
      hidden={props.label.indexOf(groupContext.search) === -1}
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
  padding: 0 10px;
  outline: none;

  &[hidden] {
    display: none;
  }

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
  search: string;
  onSearchChange: (search: string) => void;
}

const _Group: React.FunctionComponent<IDefaultSelectGroupProps> = (props) => {
  const [inputFocus, setInputFocus] = React.useState(false);
  const [ulFocus, setUlFocus] = React.useState(false);
  const [selecting, setSelecting] = React.useState([inputFocus, ulFocus].some((v) => v));

  React.useEffect(() => {
    setSelecting([inputFocus, ulFocus].some((v) => v));
  }, [inputFocus, ulFocus]);

  React.useEffect(() => {
    props.onSearchChange("");
    setSelecting(false);
  }, [props.label]);

  return (
    <GroupContext.Provider value={props}>
      <div className={props.className} data-selecting={`${selecting}`}>
        <input
          placeholder={props.label ?? props.placehold}
          value={inputFocus
            ? props.search || ""
            : props.label || ""
          }
          onChange={(e) => props.onSearchChange(e.target.value)}
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
        />

        <ul
          tabIndex={0}
          onFocus={() => setUlFocus(true)}
          onBlur={() => setUlFocus(false)}
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

  color: #444;
  font-weight: bold;

  box-shadow: 0px 2px 10px 3px rgba(0,0,0, 0.2);

  outline: none;

  border: none;
  -webkit-appearance: none;
  &::-ms-expand {
    display: none;
  }

  & > input {
    box-sizing: border-box;
    display: flex;
    align-items: center;

    font-weight: bold;

    width: 100%;
    height: 100%;
    padding: 0 10px;
    border-radius: 4px;

    border: none;
    outline: none;

    &::placeholder {
      color: #aaa;
    }
  }

  &[data-selecting=true] > ul { max-height: 200px; }

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
`;

const SearchSelect = {
  Group,
  Item,
};

export default SearchSelect;
