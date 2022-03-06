import React, { useState } from "react";
import { v4 as uuid } from "uuid";

const initialList = [
  {
    listId: uuid(),
    listName: "to-do",
    cardList: [
      {
        cardId: uuid(),
        cardName: "classic double spending problem",
      },
      {
        cardId: uuid(),
        cardName: "decentralised token swaps",
      },
    ],
  },
  {
    listId: uuid(),
    listName: "in-progress",
    cardList: [
      {
        cardId: uuid(),
        cardName: "design patterns",
      },
    ],
  },
];

const ScrumBot = () => {
  const [inputList, setInputList] = useState("");
  const [list, setList] = useState([]);

  const handleInputList = (event) => {
    setInputList(event.target.value);
  };

  const handleAddList = () => {
    setList(
      list.concat({
        listId: uuid(),
        listName: inputList,
        card: [],
      })
    );
    setInputList("");
  };

  const handleAddCard = (id) => {
    list.findIndex((item) => item.id === id);
  };

  const handleDelete = (id) => {
    setList(list.filter((item) => item.listId !== id));
  };

  return (
    <div>
      {" "}
      <AddListForm
        inputList={inputList}
        onInputList={handleInputList}
        onAddList={handleAddList}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        {" "}
        {list.map((item) => (
          <List
            key={item.id}
            list={item}
            onDelete={handleDelete}
            onAddCard={handleAddCard}
          />
        ))}
      </div>
    </div>
  );
};

const AddListForm = ({ inputList, onInputList, onAddList }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onAddList();
      }}
    >
      <input type="text" value={inputList} onChange={onInputList} />
      <button type="submit">Add List</button>
    </form>
  );
};

const List = ({ list, onDelete, onAddCard }) => {
  return (
    <div
      style={{
        backgroundColor: "lightgrey",
        width: "200px",
        margin: "10px",
        padding: "10px",
        height: "60vh",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {" "}
        <h2>{list.listName}</h2>
        <span
          style={{ cursor: "crosshair" }}
          onClick={() => onDelete(list.listId)}
        >
          x
        </span>
      </div>
      <AddTask list={list} onAddCard={onAddCard}></AddTask>
    </div>
  );
};

const AddTask = ({ list, onAddCard }) => {
  console.log(onAddCard);
  return (
    <div
      style={{
        border: "1px solid black",
        padding: "10px",
        margin: "10px",
      }}
    >
      <input style={{ width: "150px" }} type="text" />
      <button onClick={() => onAddCard(list.id)}>Add Task</button>
    </div>
  );
};

export default ScrumBot;
