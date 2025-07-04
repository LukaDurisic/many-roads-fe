import { useEffect, useState } from "react";

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (newValue: T) => void] {
  const isLocalStorageAvailable =
    typeof window !== "undefined" && typeof window.localStorage !== "undefined";

  const getStoredValue = (): T => {
    if (!isLocalStorageAvailable) return initialValue;

    const storedValue = localStorage.getItem(key);
    return storedValue ? (JSON.parse(storedValue) as T) : initialValue;
  };

  const [value, setValue] = useState<T>(getStoredValue);

  useEffect(() => {
    if (isLocalStorageAvailable) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  const setStoredValue = (newValue: T) => {
    setValue(newValue);
    if (isLocalStorageAvailable) {
      localStorage.setItem(key, JSON.stringify(newValue));
    }
  };

  return [value, setStoredValue];
}

export default useLocalStorage;
