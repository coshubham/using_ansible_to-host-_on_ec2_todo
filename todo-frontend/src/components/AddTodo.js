import React, {useState} from 'react'

const AddTodo = ({onAdd})=>{
       const [todo, setTodo] = useState('');

       const handleSubmit = async (e) => {
              e.preventDefault();
              if (!todo) return;
              onAdd(todo);
              setTodo(''); // Clear the input field after adding the todo
       }
       return (
              <form onSubmit={handleSubmit}>
                     <input type="text" 
                     value = {todo} 
                     onChange={(e)=> setTodo(e.target.value)}
                     placeholder='Enter a new todo'
                     required
                     />

                     <button type="submit">Add Todo</button>

              </form>
       )
}

export default AddTodo;