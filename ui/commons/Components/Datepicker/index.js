import React from 'react';
import Datpicker from 'react-datepicker';

import cl from '../utils/classname-processor';
import 'react-datepicker/dist/react-datepicker.css';

import styles from './styles.module.css';

function Datepicker({
	id,
	className,
	style,
	name,
	onChange = () => {},
	value,
	disable,
	dateFormat = 'dd/MM/yyyy',
	placeholder,
	isPreviousDaysAllowed,
	shouldCloseOnSelect,
	timeFormat = 'hh:mm aa',
	use12hourformat,
	maxDate,
	minDate,
	placement,
	showMonthYearPicker,
	...rest
}) {

	return (
		<div
			id={id}
			className={cl`
				${className}
				${styles.container}
				${cl.ns('datepicker_container')}
			`}
			style={style}
		>
			<Datpicker
				{...rest}
				className={cl`${styles.datepicker_container}
				`}
				name={name}
				onChange={onChange}
				selected={value}
				locale="en-IN"
				disabled={disable}
				isClearable={!disable}
				showMonthDropdown
				dateFormat={dateFormat}
				showYearDropdown
				placeholderText={placeholder || "Select Date"}
				shouldCloseOnSelect={shouldCloseOnSelect}
				minDate={isPreviousDaysAllowed ? minDate : new Date()}
				maxDate={maxDate}
				popperPlacement={placement}
				showMonthYearPicker={showMonthYearPicker}
			>
			</Datpicker>

		</div>
	);
}

export default Datepicker;
