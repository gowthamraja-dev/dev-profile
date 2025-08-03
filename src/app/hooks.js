import { useState, useEffect, useCallback } from "react";

export const useLocalStorage = (key, initialValue = null) => {
  const [value, setValue] = useState(() => {
    return localStorage.getItem(key) || initialValue;
  });

  const set = useCallback(
    (newValue) => {
      if (newValue === null || newValue === undefined) {
        localStorage.removeItem(key);
        setValue(null);
      } else {
        localStorage.setItem(key, newValue);
        setValue(newValue);
      }
    },
    [key]
  );

  const get = useCallback(() => {
    return localStorage.getItem(key) || initialValue;
  }, [key, initialValue]);

  useEffect(() => {
    const storedValue = localStorage.getItem(key);
    if (initialValue && storedValue !== initialValue) {
      set(initialValue);
    }
  }, [key, set, initialValue]);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === key) {
        setValue(event.newValue || initialValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key, initialValue]);

  return { value, set, get };
};
