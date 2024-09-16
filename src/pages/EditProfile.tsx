import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import ProfileForm from '../components/dashboard/forms/ProfileForm';
import { RootState } from '../store/store';
import { IProfileState } from '../interfaces/mongoose-models';

const EditProfile = () => {
	const { profile, isLoading } = useSelector((state: RootState) => state.profile);

	if (!profile || isLoading) {
		return <Navigate to='/dashboard' replace={true} />;
	}

	const profileSkillsAsString = profile.skills.join(', ');

	const initialState: IProfileState = {
		status: profile.status || '',
		company: profile.company || '',
		website: profile.website || '',
		location: profile.location || '',
		skills: profileSkillsAsString || '',
		githubusername: profile.githubusername || '',
		bio: profile.bio || '',
		twitter: profile.social?.twitter || '',
		facebook: profile.social?.facebook || '',
		youtube: profile.social?.youtube || '',
		linkedin: profile.social?.linkedin || '',
		instagram: profile.social?.instagram || '',
	};

	return (
		<section>
			<h2 className='mt-8 mb-2 text-center text-4xl text-green tracking-wider font-black'>Edit Your Profile</h2>
			<ProfileForm isEdit={true} outerInitialState={initialState} />
		</section>
	);
};

export default EditProfile;
