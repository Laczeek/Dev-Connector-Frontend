import { IProfileShort } from '../../interfaces/mongoose-models';

import ProfilesItem from './ProfilesItem';

interface ProfilesListProps {
	profiles: IProfileShort[] | [];
}

const ProfilesList = ({ profiles }: ProfilesListProps) => {
	return (
		<>
			{profiles.length > 0 && (
				<ul className='mt-6 max-w-[800px] mx-auto'>
					{profiles.map(profile => (
						<ProfilesItem key={profile._id} {...profile} />
					))}
				</ul>
			)}

			{profiles.length === 0 && <p className='text-white text-center text-md mt-8'>There are no profiles yet.</p>}
		</>
	);
};

export default ProfilesList;
