import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useHTTP from '../../../hooks/useHTTP';
import { IProfileState } from '../../../interfaces/mongoose-models';
import Input from '../../input/Input';
import Button from '../../button/Button';
import { AppDispatch, RootState } from '../../../store/store';
import { setAlertWithTimeout } from '../../../store/alert-slice';
import { profileActions } from '../../../store/profile.slice';
import { FacebookFilled, InstagramFilled, LinkedinFilled, TwitterSquareFilled, YoutubeFilled } from '@ant-design/icons';

const initialState: IProfileState = {
	skills: '',
	status: '',
	bio: '',
	company: '',
	website: '',
	location: '',
	githubusername: '',
	facebook: '',
	instagram: '',
	linkedin: '',
	twitter: '',
	youtube: '',
};

interface ProfileFormProps {
	isEdit?: boolean;
	outerInitialState?: IProfileState;
}

const ProfileForm = ({ isEdit, outerInitialState }: ProfileFormProps) => {
	const [inputsValues, setInputsValues] = useState<IProfileState>(outerInitialState || initialState);
	const [showSocials, setShowSocials] = useState(false);
	const { errorsObject, isLoading, removeValidationError, errors, sendRequest } = useHTTP();

	const { jwt } = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const changeInputHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
		const { name, value } = event.target;
		removeValidationError(name);
		setInputsValues(prevState => ({ ...prevState, [name]: value }));
	};

	const toggleSocials = () => {
		setShowSocials(prevState => !prevState);
	};

	const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			const bodyPayload = {
				skills: inputsValues.skills,
				status: inputsValues.status,
				bio: inputsValues.bio,
				company: inputsValues.company,
				website: inputsValues.website,
				location: inputsValues.location,
				githubusername: inputsValues.githubusername,
				social: {
					facebook: inputsValues.facebook,
					instagram: inputsValues.instagram,
					linkedin: inputsValues.linkedin,
					twitter: inputsValues.twitter,
					youtube: inputsValues.youtube,
				},
			};

			const resData = await sendRequest('/api/profiles', {
				method: 'PUT',
				headers: {
					'Content-type': 'application/json',
					Authorization: `Bearer ${jwt}`,
				},
				body: JSON.stringify(bodyPayload),
			});

			const alertMessage = isEdit ? 'Profile has been updated.' : 'Profile has been created.';

			dispatch(setAlertWithTimeout({ type: 'success', message: alertMessage }));
			dispatch(profileActions.updateProfile(resData));

			return navigate('/dashboard');
		} catch (err: unknown) {
			if (err instanceof Error) {
				console.error(err.message);
			}
		}
	};

	return (
		<form className='mt-4 p-6 bg-white max-w-[800px] mx-auto rounded-lg overflow-hidden ' onSubmit={submitHandler}>
			<Input
				type='select'
				id='status'
				label='*Status:'
				clarification='Give us an idea of where you are at in your career.'
				value={inputsValues.status}
				changeInputHandler={changeInputHandler}
				error={errorsObject?.status}
				required>
				<option value=''>Select Professional Status</option>
				<option value='Developer'>Developer</option>
				<option value='Junior Developer'>Junior Developer</option>
				<option value='Senior Developer'>Senior Developer</option>
				<option value='Manager'>Manager</option>
				<option value='Student or Learning'>Student or Learning</option>
				<option value='Instructor'>Instructor or Teacher</option>
				<option value='Intern'>Intern</option>
				<option value='Other'>Other</option>
			</Input>

			<Input
				type='text'
				id='company'
				label='Company:'
				value={inputsValues.company}
				changeInputHandler={changeInputHandler}
				clarification='Could be your own company or one you work for.'
				error={errorsObject?.company}
			/>
			<Input
				type='text'
				id='website'
				label='Website:'
				clarification='Could be your own or a company website.'
				value={inputsValues.website}
				changeInputHandler={changeInputHandler}
				error={errorsObject?.website}
			/>
			<Input
				type='text'
				id='location'
				label='Location:'
				clarification='City & state suggested (eg. Boston, MA).'
				value={inputsValues.location}
				changeInputHandler={changeInputHandler}
				error={errorsObject?.location}
			/>
			<Input
				type='text'
				id='skills'
				label='*Skills:'
				value={inputsValues.skills}
				changeInputHandler={changeInputHandler}
				clarification='Please use comma separated values (eg. HTML,CSS,JavaScript,PHP).'
				error={errorsObject?.skills}
				required
			/>
			<Input
				type='text'
				id='githubusername'
				label='Github username:'
				value={inputsValues.githubusername}
				changeInputHandler={changeInputHandler}
				clarification='If you want your latest repos and a Github link, include your username.'
				error={errorsObject?.githubusername}
			/>
			<Input
				type='textarea'
				id='bio'
				label='A short bio of yourself:'
				value={inputsValues.bio}
				changeInputHandler={changeInputHandler}
				clarification='Tell us a little about yourself.'
				error={errorsObject?.bio}
			/>

			<Button type='button' style='dark' onClick={toggleSocials} styles='mb-4'>
				{showSocials ? 'Hide socials' : 'Add socials urls'}
			</Button>
			{showSocials && (
				<>
					<TwitterSquareFilled className='block text-left text-2xl text-darkgreen' />
					<Input
						type='text'
						id='twitter'
						label='Twitter:'
						value={inputsValues.twitter}
						changeInputHandler={changeInputHandler}
						error={errorsObject?.twitter}
					/>
					<FacebookFilled className='text-2xl text-darkgreen' />
					<Input
						type='text'
						id='facebook'
						label='Facebook:'
						value={inputsValues.facebook}
						changeInputHandler={changeInputHandler}
						error={errorsObject?.facebook}
					/>
					<YoutubeFilled className='text-2xl text-darkgreen' />
					<Input
						type='text'
						id='youtube'
						label='Youtube:'
						value={inputsValues.youtube}
						changeInputHandler={changeInputHandler}
						error={errorsObject?.youtube}
					/>
					<LinkedinFilled className='text-2xl text-darkgreen' />
					<Input
						type='text'
						id='linkedin'
						label='Linkedin:'
						value={inputsValues.linkedin}
						changeInputHandler={changeInputHandler}
						error={errorsObject?.linkedin}
					/>
					<InstagramFilled className='text-2xl text-darkgreen' />
					<Input
						type='text'
						id='instagram'
						label='Instagram:'
						value={inputsValues.instagram}
						changeInputHandler={changeInputHandler}
						error={errorsObject?.instagram}
					/>
				</>
			)}

			<div className='flex justify-center gap-x-2'>
				<Button type='submit' style='light' isLoading={isLoading} isDisabled={Boolean(isLoading || errors)}>
					{isEdit ? 'Edit profile' : 'Create profile'}
				</Button>
				<Button href='..' style='outlined-dark'>
					Go Back
				</Button>
			</div>
		</form>
	);
};

export default ProfileForm;
