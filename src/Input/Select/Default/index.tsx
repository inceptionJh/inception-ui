import * as React from "react";

import styled from "styled-components";

import ScrollBar from "../../../ScrollBar";

export interface IDefaultSelectItemProps {
  className?: string;
  label: string;
  value: string;
}

const _Item: React.FunctionComponent<IDefaultSelectItemProps> = (props) => {
  const groupContext = React.useContext(GroupContext);

  return (
    <li
      {...{ _select: `${props.value === groupContext.value}` }}
      className={props.className}
      onClick={() => groupContext.onChange(props.value)}
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

  &[_select=true] {
    background: rgba(0,0,0, 0.08);
  }
`;

const GroupContext = React.createContext({} as IDefaultSelectGroupProps);

export interface IDefaultSelectGroupProps {
  className?: string;
  placehold?: string;
  value: string | null;
  onChange: (value: string) => void;
}

const _Group: React.FunctionComponent<IDefaultSelectGroupProps> = (props) => {
  const [selectedLabel, setSelectedLabel] = React.useState<string | null>(null);
  const [selecting, setSelecting] = React.useState(false);

  const ref = React.useRef() as React.RefObject<HTMLDivElement>;

  React.useEffect(() => {
    const ulEl = ref.current?.querySelector("ul")!;
    const selectedEl = Array.from(ulEl.children).find((child) => child.getAttribute("_select") === "true");
    setSelectedLabel(selectedEl?.textContent ?? null);
  }, [props.value]);

  React.useEffect(() => {
    setSelecting(false);
  }, [props.value]);

  React.useEffect(() => {
    if (!selecting) ref.current?.blur();
  }, [selecting]);

  return (
    <GroupContext.Provider value={props}>
      <div
        ref={ref}
        {...{ _selecting: `${selecting}` }}
        className={props.className}
        tabIndex={0}
        onBlur={() => setSelecting(false)}
        onMouseDown={(e) => e.preventDefault()}
        onMouseUp={(e) => e.currentTarget.focus()}
        onClick={() => setSelecting(!selecting)}
      >
        <span
          {...{
            _label: `${!!selectedLabel}`,
            _placehold: `${!!props.placehold}`,
          }}
        >
          {selectedLabel ?? props.placehold ?? null}
        </span>

        <ul onClick={(e) => e.stopPropagation()}>
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

  &[_selecting=true] > span { color: rgba(0,0,0, 0.2) !important; }

  & > span {
    display: flex;
    align-items: center;

    cursor: pointer;

    width: 100%;
    height: 100%;

    padding-left: 10px;

    &[_placehold=true] { color: rgba(0,0,0, 0.2); }
    &[_label=true] { color: #555; }
  }

  & > ul {
    position: absolute;
    left: 0;
    bottom: -5px;
    transform: translate(0, 100%);
    transition: max-height 0.2s;

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

    box-shadow: 0px 5px 5px -3px rgba(0,0,0, 0.2), 0px 8px 10px 1px rgba(0,0,0, 0.14), 0px 3px 14px 2px rgba(0,0,0, 0.12);
  }

  &[_selecting=true] > ul {
    max-height: 200px;
  }
`;

const DefaultSelect = {
  Group,
  Item,
};

export default DefaultSelect;
