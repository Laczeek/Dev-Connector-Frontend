import { useDispatch } from 'react-redux';

import { IEducation } from '../../../interfaces/mongoose-models';
import Button from '../../button/Button';
import { AppDispatch } from '../../../store/store';
import { deleteProfileEducation } from '../../../store/profile.slice';

interface EducationItemProps {
	education: IEducation;
}

const EducationItem = ({ education }: EducationItemProps) => {
	const dispatch = useDispatch<AppDispatch>();
	const years = `${new Date(education.from).toLocaleDateString()} - ${
		education.current ? 'Now' : education.to ? new Date(education.to).toLocaleDateString() : 'Not specified'
	}`;

	const deleteEducationHandler = async () => {
		await dispatch(deleteProfileEducation(education._id));
	};

	return (
		<tr>
			<td>{education.school}</td>
			<td className='hidden md:table-cell'>{education.degree}</td>
			<td className='hidden md:table-cell'>{years}</td>
			<td>
				<Button type='button' style='danger' onClick={deleteEducationHandler}>
					Delete
				</Button>
			</td>
		</tr>
	);
};

export default EducationItem;
