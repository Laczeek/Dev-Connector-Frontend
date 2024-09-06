import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
	href?: string;
	type?: 'button' | 'reset' | 'submit';
	isDisabled?: boolean;
	style: 'light' | 'dark' | 'outlined-light' | 'outlined-dark';
	children: ReactNode;
	styles?: string;
}

const Button = ({ href, type, style, styles = '', isDisabled, children }: ButtonProps) => {
	const btnStyles =
		style === 'light'
			? 'bg-green text-black'
			: style === 'dark'
			? 'bg-black text-white'
			: style === 'outlined-light'
			? 'bg-transparent text-white border-solid border-2 border-green '
			: 'bg-transparent text-black border-solid border-2 border-black ';

	if (href) {
		return (
			<Link
				to={href}
				className={`${btnStyles} ${styles} px-4 py-2 rounded-md brightness-90 hover:brightness-125 transition-all duration-300`}>
				{children}
			</Link>
		);
	}

	return (
		<button
			className={`${btnStyles} ${styles} px-4 py-2 rounded-md cursor-pointer disabled:cursor-not-allowed brightness-90 hover:brightness-125 transition-all duration-300 `}
			type={type}
			disabled={isDisabled}>
			{children}
		</button>
	);
};

export default Button;
