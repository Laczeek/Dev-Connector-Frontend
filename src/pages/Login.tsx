import { useState } from 'react';
import { LoginOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

import { AppDispatch, RootState } from '../store/store';
import { authActions } from '../store/auth-slice';
import { setAlertWithTimeout } from '../store/alert-slice';
import Button from '../components/button/Button';
import Input from '../components/input/Input';
import useHTTP from '../hooks/useHTTP';


const Login = () => {
	
	
	const [inputsValues, setInputsValues] = useState({
		email: '',
		password: '',
	});
	
	const { isLoading, sendRequest, errors, errorsObject, removeValidationError } = useHTTP();
	
	const dispatch = useDispatch<AppDispatch>();
	const {isAuthenticated} = useSelector((state: RootState) => state.auth);
	const navigate = useNavigate();

	const changeInputHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
		const { name, value } = event.target;
		removeValidationError(name);
		setInputsValues(prevState => ({ ...prevState, [name]: value }));
	};

	const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const resData = await sendRequest('/api/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ ...inputsValues }),
			});

			dispatch(authActions.login({ isAuthenticated: true, jwt: resData.jwt, user: resData.user }));
			dispatch(setAlertWithTimeout({ type: 'success', message: 'Logged in.' }));
			navigate('/dashboard');
		} catch (err: unknown) {
			if (err instanceof Error) {
				console.error(err.message);
			}
		}
	};

	if(isAuthenticated) return <Navigate to='/dashboard' replace={true}/>

	return (
		<section>
			<h2 className='my-10 text-center text-4xl text-green tracking-wider font-black'>
				{' '}
				Login <LoginOutlined />
			</h2>
			<form onSubmit={submitHandler} className=' p-6 bg-white max-w-[600px] mx-auto rounded-lg overflow-hidden '>
				<Input
					type='email'
					id='email'
					label='Email:'
					changeInputHandler={changeInputHandler}
					value={inputsValues.email}
					error={errorsObject?.email}
					required
				/>
				<Input
					type='password'
					id='password'
					label='Password:'
					changeInputHandler={changeInputHandler}
					value={inputsValues.password}
					error={errorsObject?.password}
					required
				/>
				<Button
					type='submit'
					style='outlined-dark'
					styles='mx-auto block'
					isLoading={isLoading}
					isDisabled={Boolean(isLoading || errors)}>
					Login
				</Button>
			</form>
			<p className='text-center text-grey text-lg mt-8'>
				Don't have an account?
				<Button href='/sign-up' style='light' styles='ml-2'>
					Sign up
				</Button>
			</p>
		</section>
	);
};

export default Login;
