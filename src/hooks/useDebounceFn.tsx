import { debounce } from "lodash";
import { useRef } from "react";

type Props = {
  func: Function;
  delay?: number;
};

const useDebounceFn = ({ func, delay = 1000 }: Props) => {
  const run = useRef(debounce((...arg) => {
    func(...arg)
  }, delay));
  return { run: run.current };
};

export default useDebounceFn;
