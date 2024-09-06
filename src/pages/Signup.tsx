import { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import Button from '../components/button/Button';
import Input from '../components/input/Input';

const Signup = () => {
	//TODO - ADD ERROR HANDLING
	const [inputsValues, setInputsValues] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
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
				Sign Up <UserOutlined />
			</h2>
			<form onSubmit={submitHandler} className=' p-6 bg-white max-w-[600px] mx-auto rounded-lg overflow-hidden '>
				<Input
					type='text'
					id='name'
					label='Name:'
					changeInputHandler={changeInputHandler}
					value={inputsValues.name}
					required
				/>
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
				<Input
					type='password'
					label='Confirm Password:'
					id='password2'
					changeInputHandler={changeInputHandler}
					value={inputsValues.password2}
					required
				/>
				<Button type='submit' style='outlined-dark' styles='mx-auto block'>
					Sign up
				</Button>
			</form>
			<p className='text-center text-grey text-lg mt-8'>
				Already have an account?{' '}
				<Button href='/login' style='light'>
					Login
				</Button>
			</p>
		</section>
	);
};

export default Signup;
