import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import s from './Button.module.css'

type ButtonTypeProps = {
	nameBtn: string
	addTask: (valueInput: string, todoListId: string) => void
	setError: (x: string) => void
	error: string
	id: string
}

export const ButtonInput = (props: ButtonTypeProps) => {
	const [valueInput, setValueInput] = useState('')

	const styleInputError = `${s.input} ${props.error ? s.inputError : ''}`

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setValueInput(e.currentTarget.value)
		props.error && props.setError('')
	}

	const onClickHandler = () => {
		if (valueInput.trim() !== '') {
			props.addTask(valueInput, props.id)
			setValueInput('')
		} else {
			props.setError('Title is required')
		}
	}

	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		props.setError('')
		if (e.key === "Enter") {
			onClickHandler()
		}
	}



	return (
		<>
			<input className={styleInputError} onKeyPress={onKeyPressHandler} value={valueInput} onChange={onChangeHandler} />
			<button disabled={valueInput.length < 3} onClick={onClickHandler} className={s.btn}>{props.nameBtn}</button>
		</>
	)

}