import { useState } from 'react';
import { LoginOutlined } from '@ant-design/icons';
import Button from '../components/button/Button';
import Input from '../components/input/Input';

const Login = () => {
	const [inputsValues, setInputsValues] = useState({
		email: '',
		password: '',
	});

	const changeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setInputsValues(prevState => ({ ...prevState, [name]: value }));
	};

	const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		console.log(inputsValues);
	};

	return (
		<section>
			<h2 className='my-4 text-center text-4xl text-green tracking-wider font-black'>
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
					required
				/>
				<Input
					type='password'
					id='password'
					label='Password:'
					changeInputHandler={changeInputHandler}
					value={inputsValues.password}
					required
				/>
				<Button type='submit' style='outlined-dark' styles='mx-auto block'>
					Login
				</Button>
			</form>
			<p className='text-center text-grey text-lg mt-8'>
				Don't have an account?
				<Button href='/sign-up' style='light'>
					Sign up
				</Button>
			</p>
		</section>
	);
};

export default Login;
