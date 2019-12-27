export interface IDefaultScrollBarProps {
  className?: string;
  delay?: number;
  onScroll?: <E extends Event>(e: E) => void;
}
