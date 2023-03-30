import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import s from './Button.module.css'

type ButtonTypeProps = {
	nameBtn: string
	addTask: (valueInput: string) => void
	setError: (x: boolean) => void
	error: boolean
}

export const Button = (props: ButtonTypeProps) => {
	const [valueInput, setValueInput] = useState('')

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setValueInput(e.currentTarget.value)
		props.error && props.setError(!props.error)
	}

	const onClickHandler = () => {
		props.addTask(valueInput)
		console.log(valueInput)
		setValueInput('')
	}

	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			onClickHandler()
		}
	}



	return (
		<>
			<input onKeyPress={onKeyPressHandler} value={valueInput} onChange={onChangeHandler} />
			<button disabled={valueInput.length < 3} onClick={onClickHandler} className={s.btn}>{props.nameBtn}</button>
		</>
	)

}