import { useDispatch } from 'react-redux';

import { IExperience } from '../../../interfaces/mongoose-models';
import { deleteProfileExperience } from '../../../store/profile.slice';
import Button from '../../button/Button';
import { AppDispatch } from '../../../store/store';

interface ExperienceItemProps {
	experience: IExperience;
}

const ExperienceItem = ({ experience }: ExperienceItemProps) => {
	const dispatch = useDispatch<AppDispatch>();

	const years = `${new Date(experience.from).toLocaleDateString()} - ${
		experience.current ? 'Now' : experience.to ? new Date(experience.to).toLocaleDateString() : 'Not specified'
	}`;

	const deleteExperienceHandler = async () => {
		await dispatch(deleteProfileExperience(experience._id));
	};
	return (
		<tr>
			<td>{experience.company}</td>
			<td className='hidden md:table-cell'>{experience.title}</td>
			<td className='hidden md:table-cell'>{years}</td>
			<td>
				<Button type='button' style='danger' onClick={deleteExperienceHandler}>
					Delete
				</Button>
			</td>
		</tr>
	);
};

export default ExperienceItem;
