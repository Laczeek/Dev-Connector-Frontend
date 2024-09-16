import { IEducation } from '../../../interfaces/mongoose-models';
import EducationItem from './EducationItem';

interface EducationListProps {
	educations: [] | IEducation[];
}

const EducationList = ({ educations }: EducationListProps) => {
	return (
		<section className='mt-8'>
			<h3 className='text-xl font-black mb-2'>Education Credentials</h3>
			{educations.length > 0 && (
				<table className='w-full text-center border-separate border-spacing-y-2 border-spacing-x-1'>
					<thead className='bg-grey text-md '>
						<tr className='table-row'>
							<th>School</th>
							<th className='hidden md:table-cell p-2'>Degree</th>
							<th className='hidden md:table-cell'>Years</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{educations.map(education => (
							<EducationItem key={education._id} education={education} />
						))}
					</tbody>
				</table>
			)}
			{educations.length === 0 && <p className='text-black'>So far you have not added any educations.</p>}
		</section>
	);
};

export default EducationList;
