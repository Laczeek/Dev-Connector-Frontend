/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from 'react-redux';
import { useRouteError } from 'react-router-dom';

import { AppDispatch, RootState } from '../store/store';
import { fetchUserBasedOnToken } from '../store/auth-slice';

const ErrorPage = () => {
	const error = useRouteError() as any;
	const { jwt, isAuthenticated, user } = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch<AppDispatch>();

	// GET USER IF SOMEONE ENTERS ON UNKNOWN PAGE BY SEARCHBAR
	if (jwt && !isAuthenticated && !user) {
		dispatch(fetchUserBasedOnToken());
	}

	return (
		<section className='mt-14 text-center text-white'>
			<h2 className=' text-4xl font-extrabold'>An error occurred.</h2>
			{error?.status && <p className='text-2xl font-extrabold text-green my-2'>{error.status}</p>}
			<p>Sorry, an unexpected error has occurred.</p>
			{error?.message && <p className='text-2xl'>{error.message}</p>}
		</section>
	);
};

export default ErrorPage;
