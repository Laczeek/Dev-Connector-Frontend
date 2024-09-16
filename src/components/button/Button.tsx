import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';

interface ButtonProps {
	href?: string;
	type?: 'button' | 'reset' | 'submit';
	isDisabled?: boolean;
	isLoading?: boolean;
	style: 'light' | 'dark' | 'danger' | 'outlined-light' | 'outlined-dark';
	children: ReactNode;
	styles?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onClick?: (...args: any[]) => any;
}

const Button = ({ href, type, style, styles = '', isLoading = false, isDisabled, children, ...props }: ButtonProps) => {
	const btnStyles =
		style === 'light'
			? 'bg-green text-black'
			: style === 'dark'
			? 'bg-black text-white'
			: style === 'outlined-light'
			? 'bg-transparent text-white border-solid border-2 border-green '
			: style === 'outlined-dark'
			? 'bg-transparent text-black border-solid border-2 border-black '
			: 'bg-redAlert text-white';

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
			className={`${btnStyles} ${styles} px-4 py-2 rounded-md cursor-pointer disabled:cursor-not-allowed disabled:opacity-30 brightness-90 hover:brightness-125 transition-all duration-300 ${
				isLoading ? 'flex items-center gap-x-2' : ''
			}`}
			type={type}
			disabled={isDisabled}
			{...props}>
			{children}
			{isLoading && <LoadingOutlined />}
		</button>
	);
};

export default Button;
