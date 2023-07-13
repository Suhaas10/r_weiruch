import React from "react";

const users = [
  { id: "a", name: "Robin" },
  { id: "b", name: "Dennis" }
];

const UseMemo = () => {
  console.log("App rendered");
  const [text, setText] = React.useState("");
  const [search, setSearch] = React.useState("");

  const handleText = (event) => {
    setText(event.target.value);
  };

  const handleSearch = () => {
    setSearch(text);
  };

  const filteredUsers = React.useMemo(
    () =>
      users.filter((user) => {
        console.log("filteredUsers function is running");
        return user.name.toLowerCase().includes(search.toLowerCase());
      }),
    [search]
  );

  return (
    <div>
      <input type="text" value={text} onChange={handleText} />
      <button type="button" onClick={handleSearch}>
        Search
      </button>

      <List list={filteredUsers} />
    </div>
  );
};

const List = ({ list }) => {
  console.log("List rendered");
  return (
    <ul>
      {list.map((item) => (
        <ListItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

const ListItem = ({ item }) => {
  console.log("ListItem rendered");
  return <li>{item.name}</li>;
};

export default UseMemo;
