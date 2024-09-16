import { useSelector } from 'react-redux';

import { IProfile } from '../../interfaces/mongoose-models';
import { RootState } from '../../store/store';
import Button from '../button/Button';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileRepos from './ProfileRepos';

interface ProfileProps {
	profile: IProfile;
}

const Profile = ({ profile }: ProfileProps) => {
	const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);


	return (
		<article className='mt-4 p-6 bg-white max-w-[800px] mx-auto rounded-lg'>
			<div>
				<Button href='/developers' style='outlined-dark'>
					Go Back
				</Button>
				{isAuthenticated && user && user._id === profile.user._id && (
					<Button href='/dashboard' style='dark' styles='ml-2'>
						Dashboard
					</Button>
				)}
			</div>
			<ProfileTop {...profile} />
			<ProfileAbout {...profile} />
			<div className='mt-2 flex flex-col gap-y-2 sm:flex-row sm:gap-x-2'>
				<ProfileExperience experiences={profile.experience || []} />
				<ProfileEducation educations={profile.education || []} />
			</div>
			{profile.githubusername && <ProfileRepos name={profile.githubusername} />}
		</article>
	);
};

export default Profile;
