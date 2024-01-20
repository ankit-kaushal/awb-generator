import isEmpty from 'lodash/isEmpty';
import React, { useEffect, useState, forwardRef, useRef, useMemo } from 'react';
import DownIcon from '../../Icon/down.svg';
import DeleteIcon from '../../Icon/delete.svg';

import cl from '../utils/classname-processor';

import styles from './styles.module.css';

function useOutsideClickAlerter(ref, func) {
	useEffect(() => {
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
	}, [func, ref]);
}

const NOOP = () => {};

const isInterfaceLabelOptions = (renderedOptions) => {
	if (!isEmpty(renderedOptions)) {
		return (renderedOptions[0]).options !== undefined;
	}
	return false;
};

function Select(
	{
		id,
		name,
		className,
		style,
		options = [],
		placeholder,
		value,
		loading = false,
		onChange = NOOP,
		valueKey = 'value',
		labelKey = 'label',
		onSearch,
		onHydrateValue = null,
		isClearable = false,
		disabled,
		size = 'md',
		prefix,
		suffix,
		clearIcon = <DeleteIcon />,
		renderLabel,
	},
	ref,
) {
	console.log("options",options);
	const [searchValue, setSearchValue] = useState('');
	const rootRef = useRef(null);
	const [isOpen, setIsOpen] = useState(false);
	const [hydratedValue, setHydratedValue] = useState(null);
	useOutsideClickAlerter(rootRef, () => { setIsOpen(false); });

	const handleSearch = (v) => {
		if (onSearch) {
			onSearch(v);
		} else {
			setSearchValue(v);
		}
	};

	const filteredOptions = useMemo(() => {
		if (searchValue) {
			if (isInterfaceLabelOptions(options)) {
				const newOptions = options.reduce((acc, curr) => {
					const filtered = curr.options?.filter(
						(o) => o?.[labelKey].toLowerCase().includes(searchValue.toLowerCase()),
					);
					if (filtered?.length) {
						return [...acc, ...filtered];
					}
					return acc;
				}, []);

				const modifyOptions = (searchedOptions, optionsArray) => {
					const modifiedOptions = optionsArray.map((group) => ({
						label   : group.label,
						options : group.options?.map(
							(option) => searchedOptions.find((o) => o.value === option.value),
						).filter((item) => item),
					}));
					return modifiedOptions.filter((item) => !isEmpty(item.options));
				};

				return modifyOptions(newOptions, options);
			}
			return (options).filter(
				(o) => o?.[labelKey].toLowerCase().includes(searchValue.toLowerCase()),
			);
		}
		return options;
	}, [labelKey, options, searchValue]);

	useEffect(() => {
		(async () => {
			if (typeof onHydrateValue === 'function' && value) {
				const newHydratedValue = await onHydrateValue(value);
				setHydratedValue(newHydratedValue);
			} else if (value) {
				if (isInterfaceLabelOptions(options)) {
					const newHydratedValue = (options)
						.reduce((acc, curr) => {
							const selectedVal = curr.options?.find((o) => o?.[valueKey] === value);
							if (selectedVal) {
								return selectedVal;
							}
							return acc;
						}, null);
					setHydratedValue(newHydratedValue);
					return;
				}
				const newHydratedValue = (options)?.find((option) => (option[valueKey] === value)) || null;
				setHydratedValue(newHydratedValue);
			} else if (value === undefined || value === null) {
				setHydratedValue({});
				onChange('');
			}
		})();
	}, [value]);
	
	const handleClickOpen = () => {
		if (!disabled) { setIsOpen((o) => !o); }
		setSearchValue('');
		if (onSearch) { onSearch(''); }
	};
	const placevalue = typeof hydratedValue?.[labelKey] === 'string' ? hydratedValue?.[labelKey] : null;
	return (

		<div
			className={cl`
				${className}
				${styles.container}
				${cl.ns('select_container')}
				${isOpen ? cl.ns('is_open') : ''}
				${cl.preset('size', size)}
				${disabled ? cl.ns('select_disable') : null}
			`}
			style={style}
			ref={rootRef}
		>
			<div
				className={cl`
					${styles.display_container}
					${isOpen ? styles.active : ''}
					${cl.ns('select_display_container')}
					
				`}
			>
				<div
					className={cl`
						${styles.toggle_button}
						${cl.ns('select_toggle_button')}
					`}
					aria-label="toggle menu"
					role="button"
					tabIndex={0}
					onClick={() => {
						handleClickOpen();
					}}
				>

					{prefix ? (
						<div
							className={cl`
								${styles.prefix}
								${cl.ns('select_prefix')}
							`}
						>
							{prefix}
						</div>
					) : null}

					<input
						id={id}
						ref={ref}
						list=""
						name={name}
						value={value}
						type="hidden"
					/>
					{isOpen ? (
						<input
							className={cl`
								${styles.input_control}
								${cl.ns('select_input_control')}
								${placevalue ? styles.selected : ''}
							`}
							placeholder={placevalue || placeholder}
							disabled={disabled}
							onChange={(e) => { handleSearch(e.target.value); }}
							// eslint-disable-next-line jsx-a11y/no-autofocus
							autoFocus
						/>
					) : null}

					{(onSearch && !isOpen) || (!isOpen) ? (

						<div
							className={cl`
							${styles.input_control}
							${cl.ns('select_input_control')}
						`}
						>
							{hydratedValue?.[labelKey]
							|| (
								<div
									style={{ fontWeight: '400' }}
									className={cl`
										${styles.placeholder}
										${cl.ns('select_input_placeholder')}
									`}
								>
									{placeholder}
								</div>
							)}
						</div>
					) : null}

					{suffix ? (
						<div
							className={cl`
								${styles.suffix}
								${cl.ns('select_suffix')}
							`}
						>
							{suffix}
						</div>
					) : null}

				</div>
				{isClearable && value ? (
					<div
						role="button"
						aria-label="button"
						tabIndex={0}
						className={cl`
							${styles.delete_button}
							${disabled ? cl.ns('select_clear_icon') : null}
						`}
						onClick={() => {
							disabled ? null : onChange('');
							disabled ? null : setHydratedValue({});
							setSearchValue('');
							if (onSearch) { onSearch(''); }
						}}
					>
						{clearIcon}
					</div>
				) : null}
				<div
					className={cl`${styles.toggle_svg} ${disabled ? cl.ns('select_disableicon') : null}`}
					role="button"
					aria-label="button"
					tabIndex={0}
					onClick={() => (disabled ? null : setIsOpen((o) => !o))}
				>
					<div>Down</div>
				</div>
			</div>
			<div
				className={cl`
					${styles.options_relative_container}
					${cl.ns('select_options_relative_container')}
				`}
			>
				<ul
					className={cl`
						${styles.options_container}
						${cl.ns('select_options_container')}
					`}
				>
					{loading
						? (
							<li>
								<span className={styles.list_item}>Loading</span>
							</li>
						)
						: (
							<>
								{filteredOptions.length > 0
									? filteredOptions.map((option) => {
										if (isInterfaceLabelOptions(filteredOptions)) {
											return (
												<div key={option?.label}>
													{!isEmpty(option.options) && (
														<li
															role="option"
															className={cl`
																${styles.option_heading_item}
																${option?.disabled && styles.disabled}
																${cl.ns('select_option_heading_item')}
															`}
															onClick={() => {
																if (!option?.disabled) {
																	onChange(option?.[valueKey], option);
																	setIsOpen(false);
																}
															}}
															aria-selected={option?.[valueKey] === value}
														>
															{typeof renderLabel !== 'function'
																? (
																	<span className={styles.list_heading_item}>
																		{option?.[labelKey]}
																	</span>
																)
																: renderLabel(option, labelKey)}
														</li>
													)}
													{option.options?.map((o) => (
														<li
															role="option"
															key={`${o?.[valueKey]}-${o?.[labelKey]}`}
															className={cl`
																${styles.option_item}
																${o?.disabled && styles.disabled}
																${cl.ns('select_option_item')}
															`}
															onClick={() => {
																if (!o?.disabled) {
																	onChange(o?.[valueKey], o);
																	setIsOpen(false);
																}
															}}
															aria-selected={o?.[valueKey] === value}
														>
															{typeof renderLabel !== 'function'
																? (
																	<span className={styles.list_item}>
																		{o?.[labelKey]}
																	</span>
																)
																: renderLabel(o, labelKey)}
														</li>
													))}
												</div>
											);
										}
										return (
											<li
												role="option"
												key={`${option?.[valueKey]}-${option?.[labelKey]}`}
												className={cl`
													${styles.option_item}
													${option?.disabled && styles.disabled}
													${cl.ns('select_option_item')}
												`}
												onClick={() => {
													if (!option?.disabled) {
														onChange(option?.[valueKey], option);
														setIsOpen(false);
													}
												}}
												aria-selected={option?.[valueKey] === value}
											>
												{typeof renderLabel !== 'function'
													? <span className={styles.list_item}>{option?.[labelKey]}</span>
													: renderLabel(option, labelKey)}
											</li>
										);
									})
									: (
										<li>
											<span className={styles.list_item}>No result found</span>
										</li>
									)}
							</>
						)}

				</ul>
			</div>
		</div>
	);
}

export default forwardRef(Select);
