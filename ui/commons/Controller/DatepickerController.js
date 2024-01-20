import { DatePicker } from 'antd';
import React from 'react';
import { Controller } from 'react-hook-form';

function DatepickerController(props) {
	const {
		name, control, rules, value, ...rest
	} = props;

	return (
		<Controller
			key={name}
			control={control}
			name={name}
			rules={rules}
			defaultValue={value}
			render={({ field: { onChange, onBlur, value: newValue } }) => (
				<DatePicker
					disable={rest?.disabled || false}
					showTimeSelect={rest?.withTimePicker || false}
					{...rest}
					dateFormat={rest?.dateFormat}
					key={name}
					id={name}
					onChange={(e) => {
						onChange(e);
						if (typeof rest?.onChange === 'function') {
							rest?.onChange(e);
						}
					}}
					// value={value}
					onBlur={onBlur}
					data-test-value={value}
				/>
			)}
		/>
	);
}
export default DatepickerController;
