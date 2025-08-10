import React, {useState, useEffect} from "react";

import AddTodo from "./AddTodo";
import TodoItem from "./TodoItem";
import BACKEND_URL from "../config/config";

const TodoList = () => {
       const [todos, setTodos] = useState([]);

       useEffect(() => {
              const fetchTodos = async () => {
                     try {
                            const response = await fetch(`${BACKEND_URL}/get-todo`);
                            const data = await response.json();
                            setTodos(data);
                     } catch (error) {
                            console.error("Error fetching todos:", error);
                     }
              };
              fetchTodos();
       }, []);

       const addTodo = async(title) =>{
              try {
                     const response = await fetch(`http://localhost:3001/api/add-todo`, {
                            method: "POST",
                            headers: {
                                   "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ title: title }) // Match backend
                     });
                     const newTodo = await response.json();
                     setTodos((prev) => [...prev, newTodo]); // Update state with new todo
                     console.log("Response:", response);
                     
              } catch (error) {
                     console.error("Error adding todo:", error);
              }
       }

       const deleteTodo = async (id) => {
              try {
                const response = await fetch(`http://localhost:3001/api/delete-todo/${id}`, {
                  method: "DELETE",
                });
            
                if (response.ok) {
                  setTodos((prev) => prev.filter((todo) => todo._id !== id)); // Remove from UI
                  console.log("Todo deleted successfully");
                } else {
                  console.error("Failed to delete todo");
                }
              } catch (error) {
                console.error("Error deleting todo:", error);
              }
            };
            

       return (
              <div>
                     <h1>Todo List</h1>
                     <AddTodo onAdd= {addTodo} />
                    <ul>
                     {
                            todos.map( todo => (
                                <TodoItem key={todo._id} todo={todo}
                                onDelete={() => deleteTodo(todo._id)} // Pass handler
                                ></TodoItem>
                            ))
                                 
                     }
                    </ul>
              </div>
       )
}

export default TodoList;