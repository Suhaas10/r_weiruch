//! 03032022 noreply-payroll
//?

import React, {
  useReducer,
  useState,
  useContext,
  createContext,
  useCallback,
  useEffect,
} from "react";
import { v4 as uuid } from "uuid";

const ThemeContext = createContext();

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
  console.log("TodoList : rendered ");
  const [filter, dispatchFilter] = useReducer(filterReducer, "ALL");
  const [todo, dispatchTodo] = useReducer(
    todoReducer,
    JSON.parse(localStorage.getItem("todos"))
  );

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todo));
  }, [todo]);

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
        {/* <ThemeContext.Provider value={dispatchTodo}> */}
        <AddTodo dispatch={dispatchTodo}></AddTodo>
        <Filter dispatch={dispatchFilter}></Filter>
        <TodoList1 todos={filterTodos} dispatch={dispatchTodo}></TodoList1>
        {/* </ThemeContext.Provider> */}
      </div>
    </div>
  );
};

const TodoList1 = ({ todos, dispatch }) => {
  console.log("TodoList1 : rendered ");
  return todos.map((todo) => (
    <TodoItem key={todo.id} todo={todo} dispatch={dispatch}></TodoItem>
  ));
};

const TodoItem = ({ todo, dispatch }) => {
  console.log("TodoItem : rendered ");
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(todo.todoName);

  const handleDelete = (id) => {
    dispatch({ type: "DELETE_TODO", id });
  };

  const handleToggleCompleted = (id) => {
    dispatch({ type: "TOGGLECOMPLETE_TODO", id });
  };

  const handleSave = (id, editName) => {
    dispatch({ type: "EDITSAVE_TODO", id, editName });
  };

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

const Filter = ({ dispatch }) => {
  console.log("Filter : rendered ");
  const handleShowAll = () => {
    dispatch({ type: "SHOW_ALL" });
  };

  const handleShowCompleted = () => {
    dispatch({ type: "SHOW_COMPLETED" });
  };

  const handleShowUnCompleted = () => {
    dispatch({ type: "SHOW_UNCOMPLETED" });
  };

  return (
    <div>
      <button onClick={handleShowAll}>Show All</button>
      <button onClick={handleShowCompleted}>Show completed</button>
      <button onClick={handleShowUnCompleted}>Show not completed</button>
    </div>
  );
};

const AddTodo = ({ dispatch }) => {
  console.log("AddTodo Form: rendered ");
  const [inputTodo, setInputTodo] = useState("");
  const handleInputTodo = (event) => {
    setInputTodo(event.target.value);
  };

  const addTodo = () => {
    dispatch({ type: "ADD_TODO", inputTodo });
    setInputTodo("");
  };
  return (
    <form
      style={{ padding: "20px", margin: "10px" }}
      onSubmit={(e) => {
        e.preventDefault();
        addTodo();
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
