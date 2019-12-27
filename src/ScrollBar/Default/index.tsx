import * as React from "react";

import styled from "styled-components";

import { IDefaultScrollBarProps } from "./type";

const Default: React.FunctionComponent<IDefaultScrollBarProps> = (props) => {
  const ref = React.useRef({ parentElement: { clientHeight: 0, scrollHeight: 0 } }) as React.RefObject<HTMLDivElement>;
  const container = ref.current?.parentElement!;

  const clientHeight = container.clientHeight;
  const scrollHeight = container.scrollHeight;

  const [height, setHeight] = React.useState(0);
  const [top, setTop] = React.useState(0);
  const [opacity, setOpacity] = React.useState(0);

  React.useEffect(() => {
    container.onmouseover = () => setOpacity(1);
    container.onmouseout = () => setOpacity(0);
  }, [container]);

  React.useEffect(() => {
    const delay = (props.delay ?? 0) + 50;
    const h = clientHeight / scrollHeight * clientHeight;
    setTimeout(() => setHeight(isNaN(h) ? 0 : h), delay);
  }, [clientHeight, scrollHeight]);

  React.useEffect(() => {
    const delay = (props.delay || 0) + 50;
    setTimeout(() => {
      container.onscroll = () => {
        const percent = container.scrollTop / (scrollHeight - clientHeight);

        if ((scrollHeight - height) * percent - 1 >= scrollHeight - height) return;
        setTop((scrollHeight - height) * percent);
      };
    }, delay);
  }, [clientHeight, scrollHeight, height]);

  return (
    <div
      ref={ref}
      className={props.className}
      style={{ height, top, opacity }}
    >
    </div>
  );
};

export default styled(Default)`
  position: absolute;
  top: 0;
  right: 0;

  width: 8px;
  border-radius: 4px;

  background: #ccc;
  transition: opacity 0.3s;
`;
