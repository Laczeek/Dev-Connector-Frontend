import { ReactNode } from 'react';

interface InputProps {
	type: 'text' | 'email' | 'password' | 'date' | 'checkbox' | 'textarea' | 'select';
	label: string;
	id: string;
	error: string | undefined;
	required?: boolean;
	disabled?: boolean;
	styles?: string;
	changeInputHandler: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
	value: string | boolean;
	clarification?: string;
	children?: ReactNode;
}

const Input = ({
	type,
	id,
	label,
	error,
	styles = '',
	clarification,
	changeInputHandler,
	children,
	...props
}: InputProps) => {
	const inputStyles = `${styles} block w-full border rounded-md px-2 py-0.5 disabled:opacity-20`;
	let input: ReactNode = (
		<input
			{...props}
			type={type}
			id={id}
			name={id}
			value={props.value as string}
			className={inputStyles}
			onChange={changeInputHandler}
		/>
	);

	if (type === 'select') {
		input = (
			<select
				{...props}
				id={id}
				name={id}
				value={props.value as string}
				onChange={changeInputHandler}
				className={inputStyles}>
				{children}
			</select>
		);
	}

	if (type === 'textarea') {
		input = (
			<textarea
				{...props}
				id={id}
				name={id}
				value={props.value as string}
				className={`${inputStyles} resize-none`}
				onChange={changeInputHandler}
			/>
		);
	}

	if (type === 'checkbox') {
		input = (
			<input
				{...props}
				type={type}
				id={id}
				name={id}
				value={props.value as string}
				checked={props.value as boolean}
				className={`${inputStyles} w-auto`}
				onChange={changeInputHandler}
			/>
		);
	}

	return (
		<div className='mb-4'>
			<label htmlFor={id} className='text-lg text-darkgreen font-extrabold'>
				{label}
			</label>
			{input}
			<p className='text-sm pl-2 mt-1 text-lightred'>{error}</p>
			{clarification && <p className='text-grey text-sm'>{clarification}</p>}
		</div>
	);
};

export default Input;
