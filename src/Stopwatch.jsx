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
      <div>
        <h1>Stop Watch</h1>
      </div>
      {isOn ? (
        <button onClick={() => setIsOn(false)}>Stop</button>
      ) : (
        <button onClick={() => setIsOn(true)}>Start</button>
      )}
      <h1>{count}</h1>
      <button
        onClick={() => {
          setIsOn(false);
          setCount(0);
        }}
        disabled={count === 0}
      >
        Reset
      </button>
    </>
  );
};

export default Stopwatch;
