import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { IExperienceState } from '../../../interfaces/mongoose-models';
import Button from '../../button/Button';
import Input from '../../input/Input';
import useHTTP from '../../../hooks/useHTTP';
import { AppDispatch, RootState } from '../../../store/store';
import { setAlertWithTimeout } from '../../../store/alert-slice';
import { profileActions } from '../../../store/profile.slice';

const initialState: IExperienceState = {
	title: '',
	company: '',
	location: '',
	from: '',
	to: '',
	current: false,
	description: '',
};

const ExperienceForm = () => {
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

		const bodyPayload: Partial<IExperienceState> = { ...inputsValues };
		if (bodyPayload.current) {
			delete bodyPayload.to;
		}

		try {
			const resData = await sendRequest('/api/profiles/experience', {
				method: 'PUT',
				headers: {
					'Content-type': 'application/json',
					Authorization: `Bearer ${jwt}`,
				},
				body: JSON.stringify(bodyPayload),
			});

			dispatch(profileActions.updateProfile(resData));
			dispatch(setAlertWithTimeout({ type: 'success', message: 'Experience added to the profile.' }));
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
				id='title'
				label='*Job Title:'
				required
				value={inputsValues.title}
				changeInputHandler={changeInputHandler}
				error={errorsObject?.title}
			/>
			<Input
				type='text'
				id='company'
				label='*Company:'
				required
				value={inputsValues.company}
				changeInputHandler={changeInputHandler}
				error={errorsObject?.company}
			/>
			<Input
				type='text'
				id='location'
				label='Location:'
				value={inputsValues.location}
				changeInputHandler={changeInputHandler}
				error={errorsObject?.location}
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
				label='Is it Current Job?'
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
				label='Job Description:'
				value={inputsValues.description}
				changeInputHandler={changeInputHandler}
				error={errorsObject?.description}
			/>

			<div className='flex justify-center gap-x-2'>
				<Button type='submit' style='light' isLoading={isLoading} isDisabled={Boolean(isLoading || errors)}>
					Add Experience
				</Button>
				<Button href='..' style='outlined-dark'>
					Go Back
				</Button>
			</div>
		</form>
	);
};

export default ExperienceForm;
