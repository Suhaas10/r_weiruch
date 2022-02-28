import React, { useState } from "react";
import { v4 as uuid } from "uuid";
const TodoList = () => {
  const [taskName, setTaskName] = useState("");
  const [editInputTaskName, setEditInputTaskName] = useState(taskName);

  const [todo, setTodo] = useState([]);

  const [isEditMode, setIsEditMode] = useState(false);

  const handleTodoSubmit = (event, taskName) => {
    event.preventDefault();
    setTodo((prevState) => {
      return [
        ...prevState,
        {
          id: uuid(),
          todoName: taskName,
          completed: false,
        },
      ];
    });
    setTaskName("");
  };

  const handleEdit = (todoObj) => {
    setIsEditMode(true);
    setEditInputTaskName(todoObj.todoName);
  };

  const handleDelete = (todoObjToBeDeleted) => {
    setTodo(todo.filter((todoObj) => todoObj.id !== todoObjToBeDeleted.id));
  };

  const onSave = () => {
    console.log("edit confirm save");
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

      {isEditMode ? (
        <form>
          <label htmlFor="editTaskNameInput"></label>
          <input
            type="text"
            id="editTaskNameInput"
            value={editInputTaskName}
            onChange={(event) => setEditInputTaskName(event.target.value)}
          />
          <button type="submit">save</button>
        </form>
      ) : (
        todo.map((todoObj) => (
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
        ))
      )}
    </div>
  );
};

export default TodoList;
