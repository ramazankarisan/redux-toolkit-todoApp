import { useState } from "react";
import  { add, remove, toggleCompleted } from "./features/todoSlice";
import { fetchUser } from "./features/userSlice";
import { useAppDispatch, useAppSelector } from "./store";


function App() {
  const todos = useAppSelector(state => state.todos)
  const user = useAppSelector(state => state.user)
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
  const currentUser = user.data && user.data.results[0];
  
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
      <div>
        <button onClick={()=> dispatch(fetchUser())} >fetch user</button>
        {user.loading && "loading..."}
         {user.error && user.error}
         {currentUser && <div>
           <p>name: {currentUser.name.title} {currentUser.name.first} {currentUser.name.last}</p>
           <p>avatar : <img src={currentUser.picture.large} alt="" /></p>
           email: {currentUser.email}
           </div>}
      </div>
    </div>
  );
}

export default App;
