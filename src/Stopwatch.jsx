import React, { useEffect, useState } from "react";

const Stopwatch = ({ users }) => {
  const [isOn, setIsOn] = useState(false);
  const [watch, setWatch] = useState(0);

  useEffect(() => {
    let timer;
    if (isOn) {
      timer = setInterval(() => {
        setWatch(watch + 1);
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isOn, watch]);

  return (
    <>
      <button
        onClick={() => {
          setWatch(0);
          setIsOn(false);
        }}
      >
        Reset
      </button>
      <h1>{watch}</h1>
      <div>
        {isOn ? (
          <button onClick={() => setIsOn(false)}>Off</button>
        ) : (
          <button onClick={() => setIsOn(true)}>On</button>
        )}
      </div>
    </>
  );
};

export default Stopwatch;

// fetch("https://api-football-v1.p.rapidapi.com/v3/timezone", {
//   method: "GET",
//   headers: {
//     "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
//     "x-rapidapi-key": "d3ed23ae06msh04a989b345565b2p1d6ab6jsn9827bb570f44",
//   },
// })
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((err) => {
//     console.error(err);
//   });
