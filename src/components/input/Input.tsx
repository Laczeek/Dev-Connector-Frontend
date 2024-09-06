interface InputProps<T> {
	type: 'text' | 'email' | 'password' | 'textarea';
	label: string;
	id: string;
	required?: boolean;
	styles?: string;
	changeInputHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
	value: T
}

const Input = ({ type, id, label, styles, changeInputHandler,...props }: InputProps<string>) => {
	if (type === 'textarea') {
		return (
			<div>
				<label htmlFor={id}>{label}</label>
				<textarea id={id} {...props} className={`${styles}`} />;
			</div>
		);
	}

	return (
		<div className="mb-4">
			<label htmlFor={id} className="text-lg text-darkgreen font-extrabold">{label}</label>
			<input type={type} id={id} name={id} {...props} className={`${styles} w-full border rounded-md px-2 py-0.5`} onChange={changeInputHandler }/>
			<p className="text-sm pl-2 mt-1 text-lightred"></p>
		</div>
	);

	return;
};

export default Input;
