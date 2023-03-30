import React, { ChangeEvent } from 'react';
import { TaskType } from '../../App';
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
}

export const TodoList = (props: TodoListTypeProps) => {
	const taskList = props.tasks.map(task => {
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
				<span>{task.title}</span>
				<button onClick={onClickHandler}>✖️</button>
			</li>
		)
	})

	return (
		<div className={s.todoWrap}>
			<h2>{props.nameTodo}</h2>
			<div className={s.wrapForInputBtn}>
				<Button addTask={props.addTask} nameBtn={props.nameBtn} setError={props.setError} error={props.error} />
			</div>
			{props.error && <span className={s.errorText}>Введите текст!!!</span>}

			<ul className={s.taskList}>
				{taskList}
			</ul>
			<div className={s.btns}>
				<button>All</button>
				<button>Completed</button>
				<button>Active</button>
			</div>

		</div>
	)
}