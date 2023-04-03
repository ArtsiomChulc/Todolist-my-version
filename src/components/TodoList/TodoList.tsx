import React, { ChangeEvent } from 'react';
import { FilterValueTaskType, TaskType } from '../../App';
import { ButtonInput } from './ButtonInput/ButtonInput'
import s from './Todolist.module.css'

type TodoListTypeProps = {
	tasks: TaskType[]
	nameTodo: string
	nameBtn: string
	addItem: (valueInput: string, todoListId: string) => void
	removeTask: (id: string, todoListId: string) => void
	changeStatusTask: (taskId: string, newIsDone: boolean, todoListId: string) => void
	changeFilteredTasks: (value: FilterValueTaskType, todoListId: string) => void
	filter: FilterValueTaskType
	id: string
	removeTodoList: (todoListId: string) => void
}

export const TodoList = (props: TodoListTypeProps) => {


	const taskList = props.tasks.map(task => {
		const styleChecked = `${s.textTask} ${task.isDone ? s.checked : ''}`
		const onClickHandler = () => {
			props.removeTask(task.id, props.id)
		}
		const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
			let newIsDone = e.currentTarget.checked
			props.changeStatusTask(task.id, newIsDone, props.id)
		}
		return (
			<li key={task.id}>
				<input className={s.checkBox} onChange={onChangeHandler} type="checkbox" checked={task.isDone} />
				<span className={styleChecked}>{task.title}</span>
				<button onClick={onClickHandler}>✖️</button>
			</li>
		)
	})

	const onClickFilteredTasksAll = () => {
		props.changeFilteredTasks('all', props.id)
	}
	const onClickFilteredTasksActive = () => {
		props.changeFilteredTasks('active', props.id)
	}
	const onClickFilteredTasksCompleted = () => {
		props.changeFilteredTasks('completed', props.id)
	}

	const styleForWrapFilter = `${s.todoWrap} ${props.filter === 'active' ? s.activeColor :
		props.filter === 'completed' ? s.completedColor : ''}`

	const removeTodo = () => {
		props.removeTodoList(props.id)
	}

	const addTask = (valueInput: string) => {
		props.addItem(valueInput, props.id)
	}


	const styleForBtnsFilterAll = `${s.button} ${props.filter === 'all' ? s.buttonAllColor : ''}`
	const styleForBtnsFilterCompleted = `${s.button} ${props.filter === 'completed' ? s.buttonCompColor : ''}`
	const styleForBtnsFilterActive = `${s.button} ${props.filter === 'active' ? s.buttonActiveColor : ''}`

	return (
		<div className={styleForWrapFilter}>
			<div className={s.titleTodo}>
				{props.nameTodo}
				<button onClick={removeTodo}>Delete</button>
			</div>

			<ButtonInput addItem={addTask} nameBtn={props.nameBtn} />

			<ul className={s.taskList}>
				{taskList}
			</ul>
			<div className={s.btns}>
				<button className={styleForBtnsFilterAll} onClick={onClickFilteredTasksAll}>All</button>
				<button className={styleForBtnsFilterCompleted} onClick={onClickFilteredTasksCompleted}>Completed</button>
				<button className={styleForBtnsFilterActive} onClick={onClickFilteredTasksActive}>Active</button>
			</div>

		</div>
	)
}