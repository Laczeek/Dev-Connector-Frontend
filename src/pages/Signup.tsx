import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserOutlined } from '@ant-design/icons';
import { Navigate, useNavigate } from 'react-router-dom';

import { AppDispatch, RootState } from '../store/store';
import { setAlertWithTimeout } from '../store/alert-slice';
import { authActions } from '../store/auth-slice';
import useHTTP from '../hooks/useHTTP';
import Button from '../components/button/Button';
import Input from '../components/input/Input';
import FileInput from '../components/file-input/FileInput';

interface IInputsValues {
	name: string;
	email: string;
	avatar: null | File;
	password: string;
	passwordConfirm: string;
}

const Signup = () => {
	const [inputsValues, setInputsValues] = useState<IInputsValues>({
		name: '',
		email: '',
		avatar: null,
		password: '',
		passwordConfirm: '',
	});

	const { sendRequest, errors, isLoading, removeValidationError, errorsObject } = useHTTP();

	const dispatch = useDispatch<AppDispatch>();
	const { isAuthenticated } = useSelector((state: RootState) => state.auth);
	const navigate = useNavigate();

	const changeInputHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
		let { value } = event.target;
		const { name } = event.target;

		if (name === 'name') {
			const nameArr = value.split(' ');
			value = nameArr
				.map(el => {
					if (el && typeof el === 'string') {
						return el[0].toUpperCase() + el.slice(1, el.length);
					}
				})
				.join(' ');
		}

		removeValidationError(name);
		setInputsValues(prevState => ({ ...prevState, [name]: value }));
	};

	const changeFileHandler = (file: File) => {
		removeValidationError('avatar');
		setInputsValues(prevState => ({ ...prevState, ['avatar']: file }));
	};

	const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData();

		formData.set('name', inputsValues.name);
		formData.set('email', inputsValues.email);
		formData.set('avatar', inputsValues.avatar!);
		formData.set('password', inputsValues.password);
		formData.set('passwordConfirm', inputsValues.passwordConfirm);

		try {
			const resData = await sendRequest('/api/users', {
				method: 'POST',

				body: formData,
			});

			dispatch(setAlertWithTimeout({ type: 'success', message: 'Your account has been created.' }));
			dispatch(authActions.login({ jwt: resData.jwt, isAuthenticated: true, user: resData.user }));
			navigate('/dashboard');
		} catch (err: unknown) {
			if (err instanceof Error) {
				console.error(err.message);
			}
		}
	};
	if (isAuthenticated) return <Navigate to='/dashboard' replace={true} />;

	return (
		<section>
			<h2 className='my-10 text-center text-4xl text-green tracking-wider font-black'>
				{' '}
				Sign Up <UserOutlined />
			</h2>
			<form onSubmit={submitHandler} className=' p-6 bg-white max-w-[600px] mx-auto rounded-lg overflow-hidden '>
				<Input
					type='text'
					id='name'
					label='Name:'
					changeInputHandler={changeInputHandler}
					value={inputsValues.name}
					error={errorsObject?.name}
					required
				/>
				<Input
					type='email'
					id='email'
					label='Email:'
					changeInputHandler={changeInputHandler}
					value={inputsValues.email}
					error={errorsObject?.email}
					required
				/>
				<FileInput label='Avatar:' id='avatar' changeFileHandler={changeFileHandler} error={errorsObject?.avatar} />
				<Input
					type='password'
					id='password'
					label='Password:'
					changeInputHandler={changeInputHandler}
					value={inputsValues.password}
					error={errorsObject?.password}
					required
				/>
				<Input
					type='password'
					label='Confirm Password:'
					id='passwordConfirm'
					changeInputHandler={changeInputHandler}
					value={inputsValues.passwordConfirm}
					error={errorsObject?.passwordConfirm}
					required
				/>
				<Button
					type='submit'
					style='outlined-dark'
					styles='mx-auto block'
					isLoading={isLoading}
					isDisabled={Boolean(isLoading || errors)}>
					Sign up
				</Button>
			</form>
			<p className='text-center text-grey text-lg mt-8'>
				Already have an account?{' '}
				<Button href='/login' style='light' styles='ml-2'>
					Login
				</Button>
			</p>
		</section>
	);
};

export default Signup;
