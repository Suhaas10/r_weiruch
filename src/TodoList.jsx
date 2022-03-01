import React, { useState } from "react";
import { v4 as uuid } from "uuid";
const TodoList = () => {
  const [taskName, setTaskName] = useState("");

  const [todo, setTodo] = useState([]);

  const handleTodoSubmit = (event, taskName) => {
    event.preventDefault();
    setTodo((prevState) => {
      return [
        ...prevState,
        {
          id: uuid(),
          todoName: taskName,
          completed: false,
          isEditMode: false,
        },
      ];
    });
    setTaskName("");
  };

  const handleEdit = (todoObj) => {
    const newTodo = todo.map((todoItem) => {
      if (todoItem.id === todoObj.id) {
        const updatedItem = {
          ...todoItem,
          isEditMode: !todoItem.isEditMode,
        };

        return updatedItem;
      }
      return todoItem;
    });

    setTodo(newTodo);
  };

  const handleDelete = (todoObjToBeDeleted) => {
    setTodo(todo.filter((todoObj) => todoObj.id !== todoObjToBeDeleted.id));
  };

  return (
    <div>
      <header style={{ padding: "20px" }}>
        <h1>To-DO List</h1>
      </header>
      <form onSubmit={(event) => handleTodoSubmit(event, taskName)}>
        <label htmlFor="taskNameInput">Task Name</label>
        <input
          style={{
            backgroundColor: "white",
            border: "1px solid black",
            padding: "5px",
            borderRadius: "10px",
            margin: "30px",
          }}
          type="text"
          id="taskNameInput"
          value={taskName}
          onChange={(event) => setTaskName(event.target.value)}
          required
        />
      </form>

      {todo.map((todoObj) =>
        todoObj.isEditMode ? (
          <EditComponent todoItem={todoObj} />
        ) : (
          <div style={{ margin: "20px" }} key={todoObj.id}>
            <div
              style={{
                display: "inline",
                backgroundColor: "#FFF000",
                padding: "8px",
                margin: "20px",
                borderRadius: "0 10px 0 10px",
              }}
            >
              {todoObj.todoName}
            </div>
            <button onClick={() => handleEdit(todoObj)}>Edit</button>
            <button onClick={() => handleDelete(todoObj)}>Delete</button>
          </div>
        )
      )}
    </div>
  );
};

const EditComponent = ({ todoItem }) => {
  const [editInputTaskName, setEditInputTaskName] = useState(todoItem.todoName);
  return (
    <div key={todoItem.id}>
      <label htmlFor="editTaskNameInput"></label>
      <input
        type="text"
        id="editTaskNameInput"
        value={editInputTaskName}
        onChange={(event) => setEditInputTaskName(event.target.value)}
      />
      <button type="submit">save</button>
    </div>
  );
};

export default TodoList;
