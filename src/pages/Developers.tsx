import { useEffect, useState } from 'react';

import useHTTP from '../hooks/useHTTP';
import { IProfileShort } from '../interfaces/mongoose-models';
import LoadingSpinner from '../components/loading-spinner/LoadingSpinner';
import ProfilesList from '../components/developers/ProfilesList';
import { TeamOutlined } from '@ant-design/icons';

const Developers = () => {
	const [profiles, setProfiles] = useState<[] | IProfileShort[]>([]);
	const { sendRequest, isLoading, errorMsg } = useHTTP();

	useEffect(() => {
		const fetchProfiles = async () => {
			try {
				const resData = await sendRequest('/api/profiles');

				setProfiles(resData);
			} catch (err: unknown) {
				if (err instanceof Error) {
					console.error(err.message);
				}
			}
		};

		fetchProfiles();
	}, [sendRequest]);

	return (
		<section>
			<h2 className='mt-8 mb-2 text-center text-4xl text-green tracking-wider font-black'>Developers</h2>
			<p className='text-white text-xl text-center'>
				<TeamOutlined /> Browse and connect with developers.
			</p>
			{isLoading && <LoadingSpinner />}
			{!isLoading && errorMsg && <p className='text-white text-center text-md mt-8'>{errorMsg}</p>}
			{!isLoading && !errorMsg && <ProfilesList profiles={profiles} />}
		</section>
	);
};

export default Developers;
