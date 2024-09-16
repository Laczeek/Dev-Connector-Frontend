import { IEducation } from '../../interfaces/mongoose-models';

interface ProfileEducationProps {
	educations: IEducation[] | [];
}

const ProfileEducation = ({ educations }: ProfileEducationProps) => {
	return (
		<section className='rounded-lg border-2 border-grey p-2 text-center grow'>
			<h4 className='font-semibold text-lg '>Education</h4>
			{educations.length > 0 && (
				<ul className='mt-2'>
					{educations.map(education => (
						<li key={education._id} className='mt-2 bg-greenbg rounded-lg p-2 text-grey'>
							<article>
								<h5 className='text-md font-semibold text-white'>{education.school}</h5>
								<p className='text-xs'>
									{new Date(education.from).toLocaleDateString()} -{' '}
									{education.current
										? 'Now'
										: education.to
										? new Date(education.to).toLocaleDateString()
										: 'Not Specified'}
								</p>
								<p className='text-sm'>
									<strong>Degree: </strong>: {education.degree}
								</p>
								<p className='text-sm'>
									<strong>Field of Study: </strong>: {education.fieldofstudy}
								</p>
								{education.description && (
									<p className='text-sm'>
										<strong>Description: </strong>
										{education.description}
									</p>
								)}
							</article>
						</li>
					))}
				</ul>
			)}

			{educations.length === 0 && <p>No education credentials.</p>}
		</section>
	);
};

export default ProfileEducation;
