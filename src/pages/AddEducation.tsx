import EducationForm from '../components/dashboard/forms/EducationForm';

const AddEducation = () => {
	return (
		<section>
			<h2 className='mt-8 mb-2 text-center text-4xl text-green tracking-wider font-black'> Add Your Education</h2>
			<p className='text-white text-center text-xl'>Add any school, bootcamp, etc that you have attended.</p>

			<EducationForm />
		</section>
	);
};

export default AddEducation;
