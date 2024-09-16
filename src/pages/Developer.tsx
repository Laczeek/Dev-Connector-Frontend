import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { IProfile } from '../interfaces/mongoose-models';
import useHTTP from '../hooks/useHTTP';
import Profile from '../components/developer/Profile';
import LoadingSpinner from '../components/loading-spinner/LoadingSpinner';

const Developer = () => {
	const [profile, setProfile] = useState<IProfile | null>(null);
	const params = useParams();
	const { sendRequest, isLoading, errorMsg } = useHTTP();
	const uid = params.uid!;

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const resData = await sendRequest(`/api/profiles/${uid}`);
				setProfile(resData);
			} catch (err: unknown) {
				if (err instanceof Error) {
					console.error(err.message);
				}
			}
		};
		fetchProfile();
	}, [sendRequest, uid]);

	return (
		<section>
			<h2 className='mt-8 mb-2 text-center text-4xl text-green tracking-wider font-black'>Developer Profile</h2>
			<p className='text-white text-xl text-center'></p>
			{isLoading && <LoadingSpinner />}
			{!isLoading && errorMsg && <p className='text-white text-center text-md mt-8'>{errorMsg}</p>}
			{!isLoading && !errorMsg && profile && <Profile profile={profile} />}
		</section>
	);
};

export default Developer;
