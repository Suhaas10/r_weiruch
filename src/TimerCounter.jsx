import React, { useState, useEffect } from "react";

const TimerCounter = () => {
  const [count, setCounter] = useState(0);

  useEffect(() => {
    let timer = setTimeout(() => {
      setCounter(count + 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count]);

  return (
    <h1
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      {count}
    </h1>
  );
};

export default TimerCounter;
