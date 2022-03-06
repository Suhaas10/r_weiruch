import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import AckoTable from "./AckoTable";

const TodoList = () => {
  const [inputTodo, setInputTodo] = useState("");

  const [todo, setTodo] = useState([]);

  const handleInputTodo = (event) => {
    setInputTodo(event.target.value);
  };

  const addTodo = () => {
    // let newTodoList = todo.concat({
    //   id: uuid(),
    //   todoName: inputTodo,
    // });

    setTodo([...todo, { id: uuid(), todoName: inputTodo, isCompleted: false }]);
    console.log("before storing", todo);
    localStorage.setItem("todoList", JSON.stringify(...todo));
    setInputTodo("");
  };

  const handleDelete = (id) => {
    setTodo(todo.filter((item) => item.id !== id));
  };

  const handleToggleCompleted = (id) => {
    //!dont do the below and you know why, don't directly update the state
    // setTodo(
    //   todo.map((item) => {
    //     if (item.id === id) {
    //       item.isCompleted = !item.isCompleted;
    //     }
    //     return item;
    //   })
    // );
    setTodo(
      todo.map((item) => {
        if (item.id === id) {
          return { ...todo, isCompleted: !item.isCompleted };
        } else {
          return item;
        }
      })
    );
  };

  const handleSave = (id, editName) => {
    setTodo(
      todo.map((item) => {
        if (item.id === id) {
          item.todoName = editName;
        }
        return item;
      })
    );
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          background: "linear-gradient(red,pink)",
          padding: "20px",
          margin: "20px",
          width: "500px",
        }}
      >
        <h1>To-Do App</h1>
        <AddTodo
          handleAddTodo={addTodo}
          inputTodo={inputTodo}
          handleInputTodo={handleInputTodo}
        ></AddTodo>
        {todo.map((item) => (
          <TodoList1
            key={item.id}
            todo={item}
            handleDelete={handleDelete}
            handleToggleCompleted={handleToggleCompleted}
            handleSave={handleSave}
          />
        ))}
      </div>
    </div>
  );
};

const TodoList1 = ({
  todo,
  handleDelete,
  handleToggleCompleted,
  handleSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(todo.todoName);

  return (
    <div>
      {isEditing ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "5px",
            margin: "5px",
          }}
        >
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <button
            onClick={() => {
              setIsEditing(false);
              handleSave(todo.id, editName);
            }}
          >
            save
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "5px",
            margin: "5px",
          }}
        >
          <div
            style={{
              fontSize: "20px",
              fontFamily: "cursive",
              textDecoration: todo.isCompleted ? "line-through" : "none",
            }}
            onClick={() => handleToggleCompleted(todo.id)}
          >
            {todo.todoName}
          </div>
          <div>
            <button onClick={() => setIsEditing(true)}>edit</button>
            <button onClick={() => handleDelete(todo.id)}>delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

const AddTodo = ({ inputTodo, handleInputTodo, handleAddTodo }) => {
  return (
    <form
      style={{ padding: "20px", margin: "10px" }}
      onSubmit={(e) => {
        e.preventDefault();
        handleAddTodo();
      }}
    >
      <label htmlFor="btnAddTodo">Add to-do</label>
      <input
        type="text"
        id="btnAddTodo"
        value={inputTodo}
        onChange={handleInputTodo}
        required
      />
      <button type="submit">Add to-do</button>
    </form>
  );
};

export default TodoList;
