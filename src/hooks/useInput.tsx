import {
  type ChangeEvent,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";

const useInput = (initialValue: string) => {
  const [value, setValue] = useState<string>(initialValue);

  const debounceTimeout = useRef<number | null>(null);

  const debounceSetValue = useCallback((newValue: string) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = window.setTimeout(() => {
      setValue((prevValue) => {
        if (prevValue === newValue) {
          return prevValue;
        }
        return newValue;
      });
    }, 50);
  }, []);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      debounceSetValue(newValue);
    },
    [debounceSetValue]
  );

  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  return {
    value,
    handleChange,
  };
};

export default useInput;
