import React, { useState, useEffect, forwardRef, useRef } from 'react';

import cl from '../utils/classname-processor';

import styles from './styles.module.css';

function useOutsideClickAlerter(ref, func, shouldAddEventListener = true) {
	useEffect(() => {
		if (!shouldAddEventListener) {
			return () => {};
		}
		const handleClickOutside = (e) => {
			if (ref.current && !ref.current.contains(e.target)) {
				func();
			}
		};
		// Bind the event listener
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [func, ref, shouldAddEventListener]);
}

function Input(
	{
		id,
		className,
		size = 'md',
		name,
		onChange = () => { },
		value,
		defaultValue,
		placeholder,
		onBlur,
		disabled,
		required,
		max,
		min,
		minLength,
		maxLength,
		step,
		onKeyDown,
		onKeyUp,
		type: preType,
		readonly,
		style,
		prefix = null,
		suffix = null,
		loading = false,
		options = [],
		valueKey = 'value',
		onSearch = () => { },
	},
	ref,
) {

	const type = preType;

	const rootRef = useRef(null);
	const [isOpen, setIsOpen] = useState(false);
	useOutsideClickAlerter(rootRef, () => { setIsOpen(false); }, false);

	const handleClickOpen = () => {
		if (!disabled) { setIsOpen(true); }
		if (onSearch) { onSearch(value); }
	};

	return (
		<div
			id={id}
			className={cl`
				${className}
				${styles.container}
				${cl.ns('input_container')}
				${isOpen ? cl.ns('is_open') : ''}
				${cl.preset('size', size)}
				${disabled ? styles.disabled : ''}
			`}
			style={style}
			ref={rootRef}
		>
			<div
				className={cl`
					${styles.display_container}
					${isOpen ? styles.active : ''}
					${cl.ns('input_display_container')}
				`}
			>
				<label
					className={cl`
						${styles.label}
						${cl.ns('input_label')}
					`}
				>
					{prefix ? (
						<div
							className={cl`
								${styles.prefix} 
								${cl.ns('input_prefix')}
							`}
						>
							{prefix}
						</div>
					) : null}

					<input
						ref={ref}
						className={cl`
							${styles.control}
							${cl.ns('input_control')}
							${type === 'number' ? styles.number : ''}
						`}
						name={name}
						onWheel={(e) => e.currentTarget.blur()}
						onBlur={onBlur}
						type={type || 'text'}
						onChange={(e) => {
							const newVal = e.target.value;
							const selectedOption = options.find((option) => option?.[valueKey] === newVal);
							onChange(newVal, selectedOption);
							if (onSearch) {
								onSearch(newVal);
							}
						}}
						onFocus={handleClickOpen}
						defaultValue={defaultValue}
						value={value}
						onKeyDown={onKeyDown}
						onKeyUp={onKeyUp}
						max={max}
						min={min}
						minLength={minLength}
						maxLength={maxLength}
						step={step}
						placeholder={placeholder}
						disabled={disabled}
						required={required}
						readOnly={readonly}
					/>

					{suffix ? (
						<div
							className={cl`
								${styles.suffix} 
								${cl.ns('input_suffix')}
							`}
						>
							{suffix}
						</div>
					) : null}
				</label>
			</div>
		</div>
	);
}

export default forwardRef(Input);
