import React from "react";
import "./todo_loader.css";

const TodoLoader = () => {
  return (
    <div className="todo-loader">
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default TodoLoader;
