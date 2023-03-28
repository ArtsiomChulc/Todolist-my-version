import { v1 } from 'uuid'

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export type tasksForTodoType = {
	tasks: TaskType[]
}

export type NameTodo = {
	name: string
}

export type NameBtn = {
	name: string
}

export type nameForBtnType = {
	nameForBtn: NameBtn
}

export type nameForTodoType = {
	nameForTodo: NameTodo
}

export type RootStateType = {
	tasksForTodo: tasksForTodoType
	nameForTodo: nameForTodoType
}

const state = {
	tasksForTodo: {
		tasks: [
			{ id: v1(), title: "HTML&CSS", isDone: true },
			{ id: v1(), title: "JS", isDone: false },
			{ id: v1(), title: "ReactJS", isDone: false }
		]
	},
	nameForTodo: {
		name: "What to learn?"
	},
	nameForBtn: {
		name: "Add"
	}
}

export default state;
