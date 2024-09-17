import { CheckOutlined, EnvironmentOutlined, RocketOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

import { IProfileShort } from '../../interfaces/mongoose-models';

import { Link } from 'react-router-dom';

const ProfilesItem = ({ skills, status, user, company, location }: IProfileShort) => {
	const statusText = company ? `${status} at ${company}` : status;

	return (
		<li className='mt-4'>
			<Link className='block' to={`/developer/${user._id}`}>
				<motion.article
					className='bg-black bg-opacity-20 flex flex-col items-center text-center sm:flex-row  sm:text-left sm:gap-x-6 gap-y-2 text-white rounded-lg py-4 px-6'
					whileHover={{ scale: 1.06 }}
					transition={{ type: 'spring', bounce: 0.65 }}>
					<figure>
						<img
							src={user.avatar}
							alt='User image.'
							className='rounded-full object-cover'
							width={160}
							height={160}
						/>
						<figcaption className='invisible absolute'>{user.name} profile image.</figcaption>
					</figure>
					<div className='grow'>
						<header>
							<h3 className='text-xl font-extrabold mb-2'>{user.name}</h3>
						</header>
						<p className='text-grey'>
							<RocketOutlined className='text-green' /> {statusText}
						</p>
						{location && (
							<p className='text-grey'>
								<EnvironmentOutlined className='text-green' /> {location}
							</p>
						)}
					</div>
					<ul className='text-grey self-center text-left sm:min-w-[30%]'>
						{skills.slice(0, 4).map((skill, index) => (
							<li key={skill + index}>
								<CheckOutlined className='text-green' /> {skill}
							</li>
						))}
					</ul>
				</motion.article>
			</Link>
		</li>
	);
};

export default ProfilesItem;
