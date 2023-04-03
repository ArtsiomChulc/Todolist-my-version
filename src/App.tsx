import React, { useState } from 'react';
import { v1 } from 'uuid';
import s from './App.module.css';
import { ButtonInput } from './components/TodoList/ButtonInput/ButtonInput';
import { TodoList } from './components/TodoList/TodoList';


export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type TasksType = {
  tasks: TaskType[]
}

type TodoListsType = {
  id: string
  title: string
  filter: FilterValueTaskType
}

export type FilterValueTaskType = 'all' | 'active' | 'completed'


function App() {
  // const nameTodo = 'What to learn?'
  const nameBtn = 'Add'

  // const [error, setError] = useState('')

  const todoListsId1 = v1()
  const todoListsId2 = v1()

  const [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
    { id: todoListsId1, title: "What to learn?", filter: "all" },
    { id: todoListsId2, title: "What to buy?", filter: "all" },
  ])

  const [tasksObj, setTasks] = useState({
    [todoListsId1]: [
      { id: v1(), title: "HTML&CSS", isDone: false },
      { id: v1(), title: "JS", isDone: false },
      { id: v1(), title: "ReactJS", isDone: false }
    ],
    [todoListsId2]: [
      { id: v1(), title: "milk", isDone: false },
      { id: v1(), title: "Beer", isDone: false },
      { id: v1(), title: "Bread", isDone: false }
    ]
  })


  const changeFilteredTasks = (value: FilterValueTaskType, todoListId: string) => {
    let todoList = todoLists.find(tl => tl.id === todoListId)
    if (todoList) {
      todoList.filter = value
      setTodoLists([...todoLists])
    }

  }

  const addTask = (valueInput: string, todoListId: string) => {
    const valueInputTrim = valueInput.trim()

    const newTask = { id: v1(), title: valueInputTrim, isDone: false }
    const tasks = tasksObj[todoListId]
    const task = [newTask, ...tasks]
    tasksObj[todoListId] = task
    setTasks({ ...tasksObj })
    // } else {
    //   setError('dkdkdkdk')

  }


  const removeTask = (taskId: string, todoListId: string) => {
    const tasks = tasksObj[todoListId]
    const filteredTasks = tasks.filter(task => task.id !== taskId)
    tasksObj[todoListId] = filteredTasks
    setTasks({ ...tasksObj })
  }

  const changeStatusTask = (taskId: string, newIsDone: boolean, todoListId: string) => {
    const tasks = tasksObj[todoListId]
    const ChangedTask = tasks.find(t => t.id === taskId)
    if (ChangedTask) {
      ChangedTask.isDone = newIsDone
      setTasks({ ...tasksObj })
    }
  }

  const addTodoList = (valueInput: string) => {
    const newTodo: TodoListsType = { id: v1(), title: valueInput, filter: "all" }
    setTodoLists([newTodo, ...todoLists])
    setTasks({
      ...tasksObj,
      [newTodo.id]: []
    })
  }

  const removeTodoList = (todoListId: string) => {
    let filterForRemoveTD = todoLists.filter(tl => tl.id !== todoListId)
    setTodoLists(filterForRemoveTD)
  }

  return (
    <div className={s.app}>
      <div className={s.addTodoListInput}>
        <ButtonInput addItem={addTodoList} nameBtn={nameBtn} />
      </div>
      <div className={s.wrapTodo}>
        {todoLists.map(tl => {
          const filteredTasks = () => {
            let filteredTasksArray = tasksObj[tl.id]
            switch (tl.filter) {
              case 'active':
                return filteredTasksArray = filteredTasksArray.filter(t => t.isDone === false)
              case 'completed':
                return filteredTasksArray = filteredTasksArray.filter(t => t.isDone === true)
              default:
                return filteredTasksArray
            }
          }
          return (
            <TodoList
              key={tl.id}
              id={tl.id}
              tasks={filteredTasks()}
              nameTodo={tl.title}
              nameBtn={nameBtn}
              addItem={addTask}
              removeTask={removeTask}
              changeStatusTask={changeStatusTask}
              changeFilteredTasks={changeFilteredTasks}
              filter={tl.filter}
              removeTodoList={removeTodoList}
            />
          )
        })}

      </div>

    </div>
  );
}

export default App;