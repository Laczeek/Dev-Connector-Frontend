import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { IEducationState } from '../../../interfaces/mongoose-models';
import Button from '../../button/Button';
import Input from '../../input/Input';
import useHTTP from '../../../hooks/useHTTP';
import { AppDispatch, RootState } from '../../../store/store';
import { setAlertWithTimeout } from '../../../store/alert-slice';
import { profileActions } from '../../../store/profile.slice';

const initialState: IEducationState = {
	degree: '',
	fieldofstudy: '',
	from: '',
	school: '',
	current: false,
	description: '',
	to: '',
};

const EducationForm = () => {
	const [inputsValues, setInputsValues] = useState(initialState);
	const { errors, errorsObject, isLoading, removeValidationError, sendRequest } = useHTTP();
	const { jwt } = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const changeInputHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
		const { name, value } = event.target;
		if (name === 'current') {
			return setInputsValues(prevState => ({ ...prevState, [name]: !prevState.current }));
		} else {
			setInputsValues(prevState => ({ ...prevState, [name]: value }));
		}
		removeValidationError(name);
	};

	const submitHanlder = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const bodyPayload: Partial<IEducationState> = { ...inputsValues };
		if (bodyPayload.current) {
			delete bodyPayload.to;
		}

		try {
			const resData = await sendRequest('/api/profiles/education', {
				method: 'PUT',
				headers: {
					'Content-type': 'application/json',
					Authorization: `Bearer ${jwt}`,
				},
				body: JSON.stringify(bodyPayload),
			});

			dispatch(profileActions.updateProfile(resData));
			dispatch(setAlertWithTimeout({ type: 'success', message: 'Education added to the profile.' }));
			navigate('/dashboard');
		} catch (err: unknown) {
			if (err instanceof Error) {
				console.error(err.message);
			}
		}
	};

	return (
		<form className='mt-4 p-6 bg-white max-w-[800px] mx-auto rounded-lg overflow-hidden ' onSubmit={submitHanlder}>
			<Input
				type='text'
				id='school'
				label='*School or Bootcamp:'
				required
				value={inputsValues.school}
				changeInputHandler={changeInputHandler}
				error={errorsObject?.school}
			/>
			<Input
				type='text'
				id='degree'
				label='*Degree or Certificate:'
				required
				value={inputsValues.degree}
				changeInputHandler={changeInputHandler}
				error={errorsObject?.degree}
			/>
			<Input
				type='text'
				id='fieldofstudy'
				label='*Field of Study:'
				required
				value={inputsValues.fieldofstudy}
				changeInputHandler={changeInputHandler}
				error={errorsObject?.fieldofstudy}
			/>
			<Input
				type='date'
				id='from'
				label='From Date:'
				required
				value={inputsValues.from}
				changeInputHandler={changeInputHandler}
				error={errorsObject?.from}
			/>
			<Input
				type='checkbox'
				id='current'
				label='Is it Current School or Bootcamp?'
				value={inputsValues.current}
				changeInputHandler={changeInputHandler}
				error={errorsObject?.current}
			/>
			<Input
				type='date'
				id='to'
				label='To Date:'
				value={inputsValues.to}
				changeInputHandler={changeInputHandler}
				disabled={inputsValues.current}
				error={errorsObject?.to}
			/>
			<Input
				type='textarea'
				id='description'
				label='Program Description:'
				value={inputsValues.description}
				changeInputHandler={changeInputHandler}
				error={errorsObject?.description}
			/>

			<div className='flex justify-center gap-x-2'>
				<Button type='submit' style='light' isLoading={isLoading} isDisabled={Boolean(isLoading || errors)}>
					Add Education
				</Button>
				<Button href='..' style='outlined-dark'>
					Go Back
				</Button>
			</div>
		</form>
	);
};

export default EducationForm;
