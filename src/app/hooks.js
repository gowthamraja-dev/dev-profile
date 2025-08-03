import { useState, useEffect, useCallback } from "react";

export const useLocalStorage = (key, initialValue = null) => {
  const [value, setValue] = useState(() => {
    return localStorage.getItem(key) || initialValue;
  });

  const set = useCallback(
    (newValue) => {
      if (!newValue) {
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
        if (event.newValue === null) {
          setValue(null);
          console.log(
            `Key "${key}" was removed from localStorage in another tab`
          );
        } else {
          setValue(event.newValue);
          console.log(
            `Storage event for key "${key}": new value = ${event.newValue}`
          );
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);

  return { value, set, get };
};
