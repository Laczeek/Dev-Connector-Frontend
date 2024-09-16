import { IExperience } from '../../../interfaces/mongoose-models';
import ExperienceItem from './ExperienceItem';

interface ExperienceListProps {
	experiences: [] | IExperience[];
}

const ExperienceList = ({ experiences }: ExperienceListProps) => {
	return (
		<section className='mt-8'>
			<h3 className='text-xl font-black mb-2'>Experience Credentials</h3>
			{experiences.length > 0 && (
				<table className='w-full text-center border-separate border-spacing-y-2 border-spacing-x-1'>
					<thead className='bg-grey text-md '>
						<tr className='table-row'>
							<th>Company</th>
							<th className='hidden md:table-cell p-2'>Title</th>
							<th className='hidden md:table-cell'>Years</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{experiences.map(experience => (
							<ExperienceItem key={experience._id} experience={experience} />
						))}
					</tbody>
				</table>
			)}
			{experiences.length === 0 && <p className='text-black'>So far you have not added any experiences.</p>}
		</section>
	);
};

export default ExperienceList;
