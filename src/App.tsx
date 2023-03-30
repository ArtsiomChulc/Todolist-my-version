import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { TodoList } from './components/TodoList/TodoList';


export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type TasksType = {
  tasks: TaskType[]
}


function App() {
  const nameTodo = 'What to learn?'
  const nameBtn = 'Add'

  const [error, setError] = useState(false)

  const [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: "HTML&CSS", isDone: false },
    { id: v1(), title: "JS", isDone: false },
    { id: v1(), title: "ReactJS", isDone: false }
  ])

  const addTask = (valueInput: string) => {
    const valueInputTrim = valueInput.trim()
    if (valueInputTrim.length > 0) {
      const newTask = { id: v1(), title: valueInputTrim, isDone: false }
      setTasks([newTask, ...tasks])
    } else {
      setError(!error)
    }
  }

  const removeTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId))
  }

  const changeStatusTask = (taskId: string, newIsDone: boolean) => {

    setTasks(tasks.map(t => t.id === taskId ? { ...t, isDone: newIsDone } : t))

    // let task = tasks.find(t => t.id === taskId)
    // if (task) {
    //   task.isDone = newIsDone
    //   setTasks([...tasks])
    // }
  }

  return (
    <div className="App">
      <TodoList tasks={tasks}
        nameTodo={nameTodo}
        nameBtn={nameBtn}
        addTask={addTask}
        error={error}
        setError={setError}
        removeTask={removeTask}
        changeStatusTask={changeStatusTask}
      />
    </div>
  );
}

export default App;
