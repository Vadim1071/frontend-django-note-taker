import { useState } from "react";

const useDebounce = (delay) => {
  const [timer, setTimer] = useState(null);

  const debounce = (func) => {
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(setTimeout(() => func(), delay));    
  };

  return { debounce };
}

export default useDebounce;
