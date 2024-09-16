import ExperienceForm from '../components/dashboard/forms/ExperienceForm';

const AddExperience = () => {
	return (
		<section>
			<h2 className='mt-8 mb-2 text-center text-4xl text-green tracking-wider font-black'> Add Your Experience</h2>
			<p className='text-white text-center text-xl'>
				Add any developer/programming positions that you have had in the past.
			</p>

			<ExperienceForm />
		</section>
	);
};

export default AddExperience;
