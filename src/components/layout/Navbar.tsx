import { Link, useNavigate } from 'react-router-dom';
import { CodeOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../../store/store';
import { authActions } from '../../store/auth-slice';
import { profileActions } from '../../store/profile.slice';
import Button from '../button/Button';

const Navbar = () => {
	const { isAuthenticated } = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const logoutHandler = () => {
		dispatch(authActions.logout());
		dispatch(profileActions.clearProfile());
		navigate('/login');
	};

	return (
		<header className='fixed z-20 bg-white w-full p-2 border-b-4 border-solid border-grey'>
			<nav className='container mx-auto text-center items-center md:flex md:justify-between'>
				<h1 className='text-2xl'>
					<Link to='/'>
						<CodeOutlined /> DevConnector
					</Link>
				</h1>
				<ul className='mt-2 flex items-center gap-x-2 md:w-[50%] md:mt-0 md:gap-x-4'>
					<li className='grow'>
						<Link
							to='/developers'
							className='border-2 border-solid border-transparent   hover:border-black transition-colors duration-300 w-full py-2'>
							Developers
						</Link>
					</li>
					{!isAuthenticated && (
						<>
							<li className='grow'>
								<Link
									to='/sign-up'
									className='border-2 border-solid border-transparent   hover:border-black transition-colors duration-300 w-full py-2'>
									Sign up
								</Link>
							</li>
							<li className='grow'>
								<Link
									to='login'
									className='border-2 border-solid border-transparent   hover:border-black transition-colors duration-300 w-full py-2'>
									Login
								</Link>
							</li>
						</>
					)}
					{isAuthenticated && (
						<>
							<li className='grow'>
								<Link
									to='/posts'
									className='border-2 border-solid border-transparent   hover:border-black transition-colors duration-300 w-full py-2'>
									Posts
								</Link>
							</li>		

							<li className='grow'>
								<Link
									to='/dashboard'
									className='border-2 border-solid border-transparent   hover:border-black transition-colors duration-300 w-full py-2'>
									Dashboard
								</Link>
							</li>
							<li className='grow'>
								<Button onClick={logoutHandler} type='button' style='dark' styles='w-full'>
									Logout
								</Button>
							</li>
						</>
					)}
				</ul>
			</nav>
		</header>
	);
};

export default Navbar;
