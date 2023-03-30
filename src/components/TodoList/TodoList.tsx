import React, { ChangeEvent } from 'react';
import { FilterValueTaskType, TaskType } from '../../App';
import { Button } from './ButtonInput/ButtonInput'
import s from './Todolist.module.css'

type TodoListTypeProps = {
	tasks: TaskType[]
	nameTodo: string
	nameBtn: string
	addTask: (valueInput: string) => void
	error: boolean
	setError: (x: boolean) => void
	removeTask: (id: string) => void
	changeStatusTask: (taskId: string, newIsDone: boolean) => void
	changeFilteredTasks: (value: FilterValueTaskType) => void
	filter: FilterValueTaskType
}

export const TodoList = (props: TodoListTypeProps) => {

	const taskList = props.tasks.map(task => {
		const styleChecked = `${task.isDone ? s.checked : ''}`
		const onClickHandler = () => {
			props.removeTask(task.id)
		}
		const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
			let newIsDone = e.currentTarget.checked
			props.changeStatusTask(task.id, newIsDone)
		}
		return (
			<li key={task.id}>
				<input onChange={onChangeHandler} type="checkbox" checked={task.isDone} />
				<span className={styleChecked}>{task.title}</span>
				<button onClick={onClickHandler}>✖️</button>
			</li>
		)
	})

	const onClickFilteredTasksAll = () => {
		props.changeFilteredTasks('all')
	}
	const onClickFilteredTasksActive = () => {
		props.changeFilteredTasks('active')
	}
	const onClickFilteredTasksCompleted = () => {
		props.changeFilteredTasks('completed')
	}

	const styleForWrapFilter = `${s.todoWrap} ${props.filter === 'active' ? s.activeColor :
		props.filter === 'completed' ? s.completedColor : ''}`

	const styleForBtnsFilterAll = `${s.button} ${props.filter === 'all' ? s.buttonAllColor : ''}`
	const styleForBtnsFilterCompleted = `${s.button} ${props.filter === 'completed' ? s.buttonCompColor : ''}`
	const styleForBtnsFilterActive = `${s.button} ${props.filter === 'active' ? s.buttonActiveColor : ''}`

	return (
		<div className={styleForWrapFilter}>
			<h2>{props.nameTodo}</h2>
			<div className={s.wrapForInputBtn}>
				<Button addTask={props.addTask} nameBtn={props.nameBtn} setError={props.setError} error={props.error} />
			</div>
			{props.error && <span className={s.errorText}>Введите текст!!!</span>}

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