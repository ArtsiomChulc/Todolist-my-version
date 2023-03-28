import React from 'react';
import { Input } from './Input/Input'
import { Button } from './Button/Button'
import s from './Todolist.module.css'
import { TaskType } from '../../redux/state';

type TodoListTypeProps = {
	tasks: TaskType[]
	nameTodo: string
	nameBtn: string
}

export const TodoList = (props: TodoListTypeProps) => {
	const taskList = props.tasks.map(task => {
		return (
			<li key={task.id}>
				<input type="checkbox" checked={task.isDone} />
				<span>{task.title}</span>
				<button>X</button>
			</li>
		)
	})

	return (
		<div className={s.todoWrap}>
			<h2>{props.nameTodo}</h2>
			<div className={s.wrapForInputBtn}>
				<Input />
				<Button nameBtn={props.nameBtn} />
			</div>

			<ul className={s.taskList}>
				{taskList}
			</ul>
		</div>
	)
}