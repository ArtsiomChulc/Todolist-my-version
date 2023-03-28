import React from 'react';
import s from './Button.module.css'

type ButtonTypeProps = {
	nameBtn: string
}

export const Button = (props: ButtonTypeProps) => {



	return (
		<>
			<button className={s.btn}>{props.nameBtn}</button>
		</>
	)

}