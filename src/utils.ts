import { MutableRefObject, useEffect, useState, useRef } from "react";

export function useDebouncedValue<T>(value: T, time: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const changeTimeout = setTimeout(() => {
      setDebouncedValue(value);
    }, time);
    return () => {
      clearTimeout(changeTimeout);
    };
  }, [value, time]);

  return debouncedValue;
}

export function getReffedValue<T>(val: T): MutableRefObject<T> {
  const valRef = useRef<T>(val);
  useEffect(() => {
    valRef.current = val;
  }, [val]);
  return valRef;
}
