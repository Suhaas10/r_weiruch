// `https://hn.algolia.com/api/v1/search?query=${input}`

import React, { useState, useEffect, useReducer } from "react";

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, isLoading: true, isError: false };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
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

const useDataApi = (initialUrl, initialData) => {
  const [url, setUrl] = useState(initialUrl);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    data: initialData,
    isLoading: false,
    isError: false,
  });

  useEffect(() => {
    dispatch({ type: "FETCH_INIT" });
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const responseJson = await response.json();

        dispatch({ type: "FETCH_SUCCESS", payload: responseJson });
      } catch (error) {
        dispatch({ type: "FETCH_FAILURE" });
      }
    };
    fetchData();
  }, [url]);

  return [state, setUrl];
};

const HackerNewsList = () => {
  const [apiQuery, setApiQuery] = useState("");
  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    "https://hn.algolia.com/api/v1/search?query=redux",
    { hits: [] }
  );

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          doFetch(`https://hn.algolia.com/api/v1/search?query=${apiQuery}`);
        }}
      >
        <input
          type="text"
          value={apiQuery}
          onChange={(e) => setApiQuery(e.target.value)}
          placeholder="redux"
        />
        <button type="submit">Search</button>
      </form>

      {isError}

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {data.hits.map((d) => (
            <li>
              <a href={d.url}>{d.title}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HackerNewsList;
