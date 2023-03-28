import React from 'react';
import './App.css';
import { TodoList } from './components/TodoList/TodoList';
import state from './redux/state';



function App() {

  const tasks = state.tasksForTodo.tasks
  const nameTodo = state.nameForTodo.name
  const nameBtn = state.nameForBtn.name

  return (
    <div className="App">
      <TodoList tasks={tasks} nameTodo={nameTodo} nameBtn={nameBtn} />
    </div>
  );
}

export default App;
