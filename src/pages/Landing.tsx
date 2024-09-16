import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import Button from '../components/button/Button';
import { RootState } from '../store/store';

const Landing = () => {
	const { isAuthenticated } = useSelector((state: RootState) => state.auth);

	if (isAuthenticated) return <Navigate to='/dashboard' replace={true} />;

	return (
		<section className="absolute bg-[url('assets/images/showcase.jpg')] top-0 bottom-0 left-0 right-0 bg-center bg-cover before:absolute before:w-full before:h-full before:bg-black before:bg-opacity-75 z-0 before:-z-10 flex justify-center items-center">
			<div className='text-white text-center'>
				<h2 className='text-4xl sm:text-6xl font-bold mb-4'>Developer Connector</h2>
				<p className='sm:text-xl text-grey tracking-wide mb-2'>
					Create a <span className='text-green'>developer</span> profile, share posts and get help from other{' '}
					<span className='text-green'>developers</span>.
				</p>
				<div className='mt-6'>
					<Button href='/sign-up' style='light' styles='mr-2'>
						Sign Up
					</Button>
					<Button href='/login' style='outlined-light'>
						Login
					</Button>
				</div>
			</div>
		</section>
	);
};

export default Landing;
