import React, { useEffect, useReducer, useState } from "react";
import { v4 as uuid } from "uuid";

const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          id: uuid(),
          todoName: action.inputTodo,
          isCompleted: false,
        },
      ];
    case "DELETE_TODO":
      return state.filter((item) => item.id !== action.id);

    case "TOGGLECOMPLETE_TODO":
      return state.map((item) => {
        if (item.id === action.id) {
          return { ...item, isCompleted: !item.isCompleted };
        }
        return item;
      });

    case "EDITSAVE_TODO":
      return state.map((item) => {
        if (item.id === action.id) {
          item.todoName = action.editName;
        }
        return item;
      });

    default:
      throw new Error();
  }
};

const filterReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_ALL":
      return "ALL";
    case "SHOW_COMPLETED":
      return "COMPLETED";
    case "SHOW_UNCOMPLETED":
      return "UNCOMPLETED";
    default:
      throw new Error();
  }
};

const TodoList = () => {
  const [inputTodo, setInputTodo] = useState("");

  // const [todo, setTodo] = useState([]);
  const [filter, dispatchFilter] = useReducer(filterReducer, "ALL");
  const [todo, dispatchTodo] = useReducer(todoReducer, []);

  const handleInputTodo = (event) => {
    setInputTodo(event.target.value);
  };

  const addTodo = () => {
    dispatchTodo({ type: "ADD_TODO", inputTodo });
    setInputTodo("");
  };

  const handleDelete = (id) => {
    dispatchTodo({ type: "DELETE_TODO", id });
  };

  const handleToggleCompleted = (id) => {
    dispatchTodo({ type: "TOGGLECOMPLETE_TODO", id });
  };

  const handleSave = (id, editName) => {
    dispatchTodo({ type: "EDITSAVE_TODO", id, editName });
  };

  const handleShowAll = () => {
    dispatchFilter({ type: "SHOW_ALL" });
  };

  const handleShowCompleted = () => {
    dispatchFilter({ type: "SHOW_COMPLETED" });
  };

  const handleShowUnCompleted = () => {
    dispatchFilter({ type: "SHOW_UNCOMPLETED" });
  };

  const filterTodos = todo.filter((item) => {
    if (filter === "ALL") {
      return true;
    }

    if (filter === "COMPLETED" && item.isCompleted) {
      return true;
    }

    if (filter === "UNCOMPLETED" && !item.isCompleted) {
      return true;
    }

    return false;
  });

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
        <div>
          <button onClick={handleShowAll}>Show All</button>
          <button onClick={handleShowCompleted}>Show completed</button>
          <button onClick={handleShowUnCompleted}>Show not completed</button>
        </div>
        {filterTodos.map((item) => (
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
