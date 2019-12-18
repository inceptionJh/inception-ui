import * as React from "react";

import styled from "styled-components";

import { IDefaultScrollBarProps } from "./type";

const DefaultScrollBar: React.FunctionComponent<IDefaultScrollBarProps> = (props) => {
  const ref = React.useRef() as React.RefObject<HTMLDivElement>;

  const [height, setHeight] = React.useState(0);
  const [top, setTop] = React.useState(0);

  React.useEffect(() => {
    const delay = (props.delay || 0) + 50;
    setTimeout(() => {
      const clientHeight = ref.current?.parentElement?.clientHeight ?? 0;
      const scrollHeight = ref.current?.parentElement?.scrollHeight ?? 0;
      setHeight(clientHeight / scrollHeight * 100);
    }, delay);
  }, [ref.current?.parentElement]);

  React.useEffect(() => {
    const delay = (props.delay || 0) + 50;
    setTimeout(() => {
      const clientHeight = ref.current?.parentElement?.clientHeight ?? 0;
      ref.current?.parentElement!.onscroll = (e) => {
        const container = e.target as HTMLElement;
        const percent = container.scrollTop / (container.scrollHeight - clientHeight) * 100;
        setTop(container.offsetHeight * percent);
      };
    }, delay);
  }, [ref.current?.parentElement]);

  return (
    <div
      ref={ref}
      className={props.className}
      style={{ height: `${height}%`, top: `${top}px` }}
    >
    </div>
  );
};

export default styled(DefaultScrollBar)`
  position: absolute;
  top: 0;
  right: 0;

  width: 8px;
  border-radius: 4px;

  background: #ccc;
`;
