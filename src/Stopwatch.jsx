import React, { useEffect, useState } from "react";

const Stopwatch = ({ users }) => {
  const [count, setCount] = useState(0);
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    let timer;
    if (isOn) {
      timer = setTimeout(() => {
        setCount(count + 1);
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [count, isOn]);

  return (
    <>
      {isOn ? (
        <button onClick={() => setIsOn(false)}>Off</button>
      ) : (
        <button onClick={() => setIsOn(true)}>On</button>
      )}

      <h1>{count}</h1>

      <button
        onClick={() => {
          setIsOn(false);
          setCount(0);
        }}
      >
        Reset
      </button>
    </>
  );
};

export default Stopwatch;
