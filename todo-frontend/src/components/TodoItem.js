import React from "react";

const TodoItem = ({ todo, onDelete, onComplete }) => {
  return (
    <div>
      <p>{todo.title}</p> 
      <button onClick={onDelete}><b>Delete</b></button>
    </div>
  );
};

export default TodoItem;
