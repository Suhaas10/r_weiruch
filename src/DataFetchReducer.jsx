// `https://hn.algolia.com/api/v1/search?query=${input}`

import React, { useEffect, useReducer, useState } from "react";

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
        searchResults: action.payload,
        isError: false,
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

const useDataApi = (initialData, initialUrl) => {
  const [url, setUrl] = useState(initialUrl);

  const [state, dispatch] = useReducer(dataFetchReducerFunction, {
    isLoading: true,
    searchResults: initialData,
    isError: false,
  });

  useEffect(() => {
    const dataFetch = async () => {
      dispatch({ type: "FETCH_INIT" });

      try {
        const response = await fetch(url);
        const responseJson = await response.json();
        dispatch({ type: "FETCH_SUCCESS", payload: responseJson });
      } catch (error) {
        dispatch({ type: "FETCH_FAILURE" });
      }
    };

    dataFetch();
  }, [url]);

  return [state, setUrl];
};

const DataFetchReducer = () => {
  const [inputSearchQuery, setInputSearchQuery] = useState("redux");

  const [{ isLoading, searchResults, isError }, doFetch] = useDataApi(
    { hits: [] },
    `https://hn.algolia.com/api/v1/search?query=redux`
  );

  return (
    <>
      <div
        style={{
          display: "flex",
          margin: "10px",
          justifyContent: "center",
          backgroundColor: "orange",
          flexDirection: "column",
        }}
      >
        <h1
          style={{
            padding: "10px",
          }}
        >
          Hacker News
        </h1>
        <h4>best search engine for your tech news</h4>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          doFetch(
            `https://hn.algolia.com/api/v1/search?query=${inputSearchQuery}`
          );
        }}
        style={{ padding: "10px", margin: "10px" }}
      >
        {" "}
        <input
          type="text"
          value={inputSearchQuery}
          onChange={(e) => setInputSearchQuery(e.target.value)}
        />
        <button type="submit">search</button>
      </form>

      {isError && <div>Something went wrong...</div>}

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <div>
          {searchResults.hits.map((item) => (
            <div>
              <a href={item.url}>{item.title}</a>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default DataFetchReducer;
