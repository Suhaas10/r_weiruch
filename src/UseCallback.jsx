import React from "react";
import { v4 as uuidv4 } from "uuid";

const UseCallback = () => {
  console.log("App rendered");

  const [users, setUsers] = React.useState([
    { id: "a", name: "Robin" },
    { id: "b", name: "Dennis" }
  ]);

  const [text, setText] = React.useState("");

  const handleText = (event) => {
    setText(event.target.value);
  };

  const handleAddUser = () => {
    setUsers(users.concat({ id: uuidv4(), name: text }));
  };

  const handleRemove = React.useCallback(
    (id) => {
      setUsers(users.filter((user) => user.id !== id));
    },
    [users]
  );

  return (
    <div>
      <input type="text" value={text} onChange={handleText} />
      <button type="button" onClick={handleAddUser}>
        Add User
      </button>

      <List list={users} onRemove={handleRemove} />
    </div>
  );
};

const List = React.memo(({ list, onRemove }) => {
  console.log("List rendered");
  return (
    <ul>
      {list.map((item) => (
        <ListItem key={item.id} item={item} onRemove={onRemove} />
      ))}
    </ul>
  );
});

const ListItem = React.memo(({ item, onRemove }) => {
  console.log("ListItem rendered");
  return (
    <li>
      {item.name}
      <button type="button" onClick={() => onRemove(item.id)}>
        Remove
      </button>
    </li>
  );
});

export default UseCallback;
