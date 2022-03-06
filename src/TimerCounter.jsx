import React, { useState, useEffect } from "react";

const TimerCounter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let timer = setTimeout(() => {
      setCount(count + 1);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [count]);

  return <h1>{count}</h1>;
};

export default TimerCounter;
