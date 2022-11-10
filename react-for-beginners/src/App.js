import { useState } from "react";
import Coin_tracker from "./Coin_tracker";
import Movie from "./Movie";

function App() {
  const [toDo, setTodo] = useState("");
  const [toDos, setTodos] = useState([]);
  const onChange = (event) => setTodo(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if (toDo === "") return;
    setTodos((current) => [...current, toDo]);
    setTodo("");
  };
  const onClick = (index) => {
    setTodos(toDos.filter((item, todosIndex) => index !== todosIndex));
  };
  console.log(toDos);
  return (
    <div>
      <h1>My To Dos ({toDos.length})</h1>
      <form onSubmit={onSubmit}>
        <input
          value={toDo}
          onChange={onChange}
          type="text"
          placeholder="write your to do..."
        />
        <button>Add To Do</button>
      </form>
      <hr />
      {toDos.map((item, index) => (
        <li key={index}>
          {item} <button onClick={() => onClick(index)}>Delete</button>
        </li>
      ))}
      <Coin_tracker />
      <hr />
      <Movie />
    </div>
  );
}

export default App;
