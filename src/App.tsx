import { useState } from "react";
import  { add, remove, toggleCompleted } from "./features/todoSlice";
import { useAppDispatch, useAppSelector } from "./store";


function App() {
  const todos = useAppSelector(state => state.todos)
  const [title, setTitle] = useState("");
  const dispatch = useAppDispatch()

  const onSave = ()=>{
    dispatch(add (title));
    setTitle("")
  }

  const onDelete = (id:string)=>{
    dispatch(remove(id))
  }
  const toogle = (id:string) => {
    dispatch(toggleCompleted(id))
  }
  return (
    <div className="App">
      <h1>Redux-Toolkit Exercise</h1>
      <input type="text" value={title} name="title" onChange={(e)=> setTitle(e.currentTarget.value)} />
      <button onClick={onSave}>Save</button>
      <ul>
        {todos.map(todo =>(
          
          <li key={todo.id}>
            <button onClick={()=>toogle(todo.id)}>{todo.completed ? "mark as done!" : "mark as unfinished"}</button>
            <button onClick={()=>onDelete(todo.id)}>Delete</button>
            <span>{todo.title}</span>
            </li>))}
      </ul>
    </div>
  );
}

export default App;
