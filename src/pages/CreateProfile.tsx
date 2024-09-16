import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import ProfileForm from '../components/dashboard/forms/ProfileForm';
import { RootState } from '../store/store';

const CreateProfile = () => {
	const { profile, isLoading } = useSelector((state: RootState) => state.profile);
	if (profile || isLoading) return <Navigate to='/dashboard' replace={true} />;

	return (
		<section>
			<h2 className='mt-8 mb-2 text-center text-4xl text-green tracking-wider font-black'>Create Your Profile</h2>
			<p className='text-white text-center text-xl'>Let's get some information to make your profile stand out.</p>
			<ProfileForm />
		</section>
	);
};

export default CreateProfile;
