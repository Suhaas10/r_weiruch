//!acko interview/ awad mihailescu interview// iterate through object , object methods, for of loop
//! https://flexiple.com/loop-through-object-javascript/
//? it's a fucking excel

import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

const AckoTable = () => {
  const [data, setData] = useState({ results: [] });

  useEffect(() => {
    const fetchPeopleData = async () => {
      const response = await fetch("https://randomuser.me/api/?results=20");
      const responseJson = await response.json();
      console.log(responseJson);
      setData(responseJson);
    };
    fetchPeopleData();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th colSpan="7">People Table</th>
          </tr>
        </thead>
        <tbody>
          {/* {data.results[0].location && (
              <tr>
                {Object.keys(data.results[0].location).map((key) => (
                  <td>{key}</td>
                ))}
              </tr>
            )} */}
        </tbody>
      </table>

      <ul>
        {data.results.map((peopleObj) => (
          <li key={uuid()}>{peopleObj.name.first}</li>
        ))}
      </ul>
    </div>
  );
};

export default AckoTable;
