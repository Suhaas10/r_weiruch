// `https://hn.algolia.com/api/v1/search?query=${input}`

import React, { useEffect, useState } from "react";
import { useReducer } from "react";

const debounce = (fn, delay) => {
  let timer;
  console.log(fn);

  return (...args) => {
    clearTimeout(timer);
    let context = this;
    timer = setTimeout(() => {
      fn.apply(context, [...args]);
    }, delay);
  };
};

const dataFetchReducerFunction = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataToRender: action.payload,
      };

    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    default:
      throw new Error();
  }
};

const useCallApi = (initialUrl, initialData) => {
  const [url, setUrl] = useState(initialUrl);

  const [state, dispatch] = useReducer(dataFetchReducerFunction, {
    isLoading: false,
    isError: false,
    dataToRender: initialData,
  });

  useEffect(() => {
    let unMounted = false;
    dispatch({ type: "FETCH_INIT" });

    const dataFetch = async () => {
      try {
        const response = await fetch(url);
        const responseJson = await response.json();

        unMounted || dispatch({ type: "FETCH_SUCCESS", payload: responseJson });
      } catch (error) {
        unMounted || dispatch({ type: "FETCH_FAILURE" });
      }
    };

    dataFetch();

    return () => {
      unMounted = true;
    };
  }, [url]);

  return [state, setUrl];
};

const DataFetchReducer = () => {
  const [inputValue, setInputValue] = useState("redux");
  const [{ isLoading, dataToRender, isError }, doFetch] = useCallApi(
    "https://hn.algolia.com/api/v1/search?query=redux",
    { hits: [] }
  );

  return (
    <>
      <div
        style={{
          backgroundColor: "black",
          color: "white",
          boxSizing: "border-box",
        }}
      >
        dataFetchReducer
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          doFetch(`https://hn.algolia.com/api/v1/search?query=${inputValue}`);
        }}
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <button type="submit">Search</button>
      </form>
      {isError && <div>Something went wrong...</div>}
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <ul>
            {dataToRender.hits.map((dataObject) => (
              <li key={dataObject.title}>
                <a href={dataObject.url}>{dataObject.title}</a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default DataFetchReducer;
