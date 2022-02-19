// `https://hn.algolia.com/api/v1/search?query=${input}`

import React, { useState, useEffect } from "react";

const HackerNewsList = () => {
  const [apiquery, setApiquery] = useState("");
  const [url, setUrl] = useState(
    "https://hn.algolia.com/api/v1/search?query=redux"
  );
  const [data, setData] = useState({ hits: [] });
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setisLoading(true);
      const response = await fetch(url);
      const responseJson = await response.json();

      setData(responseJson);

      setisLoading(false);
    }
    fetchData();
  }, [url]);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setUrl(`https://hn.algolia.com/api/v1/search?query=${apiquery}`);
        }}
      >
        <input
          type="text"
          value={apiquery}
          onChange={(e) => setApiquery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        data.hits.map((d) => <div>{d.title}</div>)
      )}
    </div>
  );
};

export default HackerNewsList;
