import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import s from './Button.module.css'

type ButtonTypeProps = {
	nameBtn: string
	addItem: (valueInput: string) => void
}

export const ButtonInput = (props: ButtonTypeProps) => {
	const [error, setError] = useState<string | null>('')

	const [valueInput, setValueInput] = useState('')

	const styleInputError = `${s.input} ${error ? s.inputError : ''}`

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setValueInput(e.currentTarget.value)
		error && setError('')
	}

	const onClickHandler = () => {

		if (valueInput.trim() !== '') {
			props.addItem(valueInput)
			setValueInput('')
		} else {
			setError('Title is required')
		}
	}

	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		setError('')
		if (e.key === "Enter") {
			onClickHandler()
		}
	}



	return (
		<div className={s.wrapForInputBtn}>
			<input className={styleInputError} onKeyPress={onKeyPressHandler} value={valueInput} onChange={onChangeHandler} />
			<button disabled={valueInput.length < 3} onClick={onClickHandler} className={s.btn}>{props.nameBtn}</button>
			{error && <span className={s.errorText}>{error}</span>}
		</div>
	)
}