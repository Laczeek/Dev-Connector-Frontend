import { IExperience } from '../../interfaces/mongoose-models';

interface ProfileExperienceProps {
	experiences: IExperience[] | [];
}

const ProfileExperience = ({ experiences }: ProfileExperienceProps) => {
	return (
		<section className='rounded-lg border-2 border-grey p-2 text-center grow'>
			<h4 className='font-semibold text-lg '>Experience</h4>
			{experiences.length > 0 && (
				<ul className='mt-2'>
					{experiences.map(experience => (
						<li key={experience._id} className='mt-2 bg-greenbg rounded-lg p-2 text-grey'>
							<article>
								<h5 className='text-md font-semibold text-white'>{experience.company}</h5>
								<p className='text-xs'>
									{new Date(experience.from).toLocaleDateString()} -{' '}
									{experience.current
										? 'Now'
										: experience.to
										? new Date(experience.to).toLocaleDateString()
										: 'Not Specified'}
								</p>
								<p className='text-sm'>
									<strong>Position</strong>: {experience.title}
								</p>
								{experience.description && (
									<p className='text-sm'>
										<strong>Description: </strong>
										{experience.description}
									</p>
								)}
							</article>
						</li>
					))}
				</ul>
			)}

			{experiences.length === 0 && <p >No experience credentials.</p>}
		</section>
	);
};

export default ProfileExperience;
