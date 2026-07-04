import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue) {
  // Get stored value or fallback to initialValue
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);
      if (!storedValue) {
  return initialValue;
}

const parsedValue = JSON.parse(storedValue);

if (Array.isArray(parsedValue) && parsedValue.length === 0) {
  return initialValue;
}

return parsedValue;
    } catch (error) {
      console.log("Error reading localStorage:", error);
      return initialValue;
    }
  });

  // Update localStorage whenever value changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log("Error saving to localStorage:", error);
    }
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;