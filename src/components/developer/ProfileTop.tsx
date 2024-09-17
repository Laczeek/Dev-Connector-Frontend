import { Link } from 'react-router-dom';
import {
	FacebookFilled,
	InstagramFilled,
	LinkedinFilled,
	TwitterSquareFilled,
	YoutubeFilled,
	EnvironmentOutlined,
	RocketOutlined,
} from '@ant-design/icons';
import { motion } from 'framer-motion';

import { IProfileSocial } from '../../interfaces/mongoose-models';

interface IProfileTopProps {
	user: {
		_id: string;
		avatar: string;
		name: string;
	};
	company?: string;
	status: string;
	location?: string;
	social?: IProfileSocial;
}

const ProfileTop = ({ user, company, location, social, status }: IProfileTopProps) => {
	const statusText = company ? `${status} at ${company}` : status;
	const completedSocial: { [key: string]: string } = {};

	if (social) {
		Object.keys(social).forEach(key => {
			const socialUrl = social[key as keyof typeof social];
			if (socialUrl && socialUrl.trim() !== '') {
				completedSocial[key] = socialUrl;
			}
		});
	}

	return (
		<header className='bg-bluebg rounded-lg p-4 mt-4 flex justify-center text-center'>
			<div>
				<figure className='overflow-hidden rounded-full w-fit'>
					<motion.img
						src={user.avatar}
						alt='User avatar.'
						width={200}
						height={200}
						className='rounded-full p-2 border-2 border-green object-cover'
						animate={{ scale: 1.2 }}
						transition={{
							type: 'spring',
							repeat: Infinity,
							repeatDelay: 4,
							repeatType: 'mirror',
							bounce: 0.5,
							duration: 0.8,
							mass: 1,
						}}
					/>

					<figcaption className='invisible absolute'>{user.name} avatar.</figcaption>
				</figure>
				<h3 className='text-2xl text-white font-extrabold my-2'>{user.name}</h3>
				<p className='text-grey'>
					<RocketOutlined className='text-green' /> {statusText}
				</p>
				{location && (
					<p className='text-grey'>
						<EnvironmentOutlined className='text-green' /> {location}
					</p>
				)}

				<div className=' text-4xl text-green flex justify-center mt-2 gap-x-2'>
					{completedSocial.youtube && (
						<Link to={completedSocial.youtube} target='_blank'>
							<YoutubeFilled />
						</Link>
					)}
					{completedSocial.twitter && (
						<Link to={completedSocial.twitter} target='_blank'>
							<TwitterSquareFilled />
						</Link>
					)}

					{completedSocial.linkedin && (
						<Link to={completedSocial.linkedin} target='_blank'>
							<LinkedinFilled />
						</Link>
					)}

					{completedSocial.facebook && (
						<Link to={completedSocial.facebook} target='_blank'>
							<FacebookFilled />
						</Link>
					)}

					{completedSocial.instagram && (
						<Link to={completedSocial.instagram} target='_blank'>
							<InstagramFilled />
						</Link>
					)}
				</div>
			</div>
		</header>
	);
};

export default ProfileTop;
