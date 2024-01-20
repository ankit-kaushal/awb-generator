import React from 'react';

import cl from '../utils/classname-processor';
import Loader from '../Loader';

import styles from './styles.module.css';

function Button({
	id,
	className,
	size = 'md',
	themeType = 'primary',
	children = null,
	disabled: propsDisabled = false,
	loading = false,
	type = 'button',
	style = {},
	onClick = () => null,
}) {
	const disabled = propsDisabled || loading;

	return (
		<button
			id={id}
			className={cl`
				${className} 
				${styles.container} 
				${cl.ns('button_container')}
				${loading ? cl.ns('loading') : ''}
				${disabled ? cl.ns('disabled') : ''}
				${cl.preset('size', size)} 
				${cl.preset('themeType', themeType)}
			`}
			style={style}
			type={type}
			disabled={disabled}
			onClick={onClick}
		>
			{typeof children === 'string' ? (
				<span
					className={cl`
						${styles.children} 
						${cl.ns('button_childeren')}`}
				>
					{children}
				</span>
			) : children}
			{loading
				? (
					<Loader
						themeType="secondary"
						className={cl`
							${styles.loading_icon}
							${cl.ns('button_loading_icon')}
						`}
					/>
				)
				: null}
		</button>
	);
}

export default Button;
