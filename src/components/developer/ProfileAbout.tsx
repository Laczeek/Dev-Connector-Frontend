import { CheckOutlined } from '@ant-design/icons';

interface ProfileAboutProps {
	user: {
		name: string;
	};
	bio?: string;
	skills: string[];
}

const ProfileAbout = ({ user, skills, bio }: ProfileAboutProps) => {
	return (
		<>
			{bio && bio.trim() !== '' && (
				<section className='bg-greenbg rounded-lg mt-2 text-center p-2 text-grey'>
					<h4 className='text-lg font-semibold text-white'>{user.name} Bio</h4>
					<p className='font-extralight tracking-wide'>{bio}</p>
				</section>
			)}
			<section className='bg-greenbg rounded-lg mt-2 px-2 py-4 text-grey'>
				<h4 className='text-lg font-semibold text-center text-white'>Skill Set</h4>
				<ul className='flex flex-col  items-center mt-2 sm:flex-row sm:justify-around'>
					{skills.map((skill, index) => (
						<li key={skill + index}>
							<CheckOutlined className='text-green' /> {skill}
						</li>
					))}
				</ul>
			</section>
		</>
	);
};

export default ProfileAbout;
