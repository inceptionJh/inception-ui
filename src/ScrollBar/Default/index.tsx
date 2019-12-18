import * as React from "react";

import styled from "styled-components";

import { IDefaultScrollBarProps } from "./type";

const DefaultScrollBar: React.FunctionComponent<IDefaultScrollBarProps> = (props) => {
  const ref = React.useRef() as React.RefObject<HTMLDivElement>;

  const [height, setHeight] = React.useState(0);
  const [top, setTop] = React.useState(0);
  const [hover, setHover] = React.useState(false);

  React.useEffect(() => {
    ref.current?.parentElement!.onmouseover = () => setHover(true);
    ref.current?.parentElement!.onmouseout = () => setHover(false);
  }, []);

  React.useEffect(() => {
    const delay = (props.delay || 0) + 50;
    setTimeout(() => {
      const clientHeight = ref.current?.parentElement?.clientHeight ?? 0;
      const scrollHeight = ref.current?.parentElement?.scrollHeight ?? 0;
      setHeight(clientHeight / scrollHeight * clientHeight);
    }, delay);
  }, [ref.current?.parentElement]);

  React.useEffect(() => {
    const delay = (props.delay || 0) + 50;
    setTimeout(() => {
      const container = ref.current?.parentElement!;

      const clientHeight = container.clientHeight ?? 0;
      const scrollHeight = container.scrollHeight ?? 0;

      container.onscroll = () => {
        const percent = container.scrollTop / (scrollHeight - clientHeight);

        if ((scrollHeight - height) * percent - 1 >= scrollHeight - height) return;
        setTop((scrollHeight - height) * percent);
      };
    }, delay);
  }, [ref.current?.parentElement]);

  return (
    <div
      ref={ref}
      className={props.className}
      style={{ height: `${height}px`, top: `${top}px`, opacity: hover ? 1 : 1 }}
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
  transition: opacity 0.3s;
`;
