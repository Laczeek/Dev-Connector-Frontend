import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../store/store';
import { setAlertWithTimeout } from '../store/alert-slice';
import { authActions } from '../store/auth-slice';
import { profileActions } from '../store/profile.slice';

interface IError {
	field: string;
	error: string;
}

const useHTTP = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState<null | IError[]>(null);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);

	const dispatch = useDispatch<AppDispatch>();

	const sendRequest = useCallback(async (path: string, options: Partial<RequestInit> = { method: 'GET' }) => {
		setIsLoading(true);
		setErrors(null);
		setErrorMsg(null);
		let isCustomError: boolean = false;
		try {
			const response = await fetch(`${import.meta.env.VITE_API_PREFIX}${path}`, options);

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			let data: null | any;
			if (response.status === 204) {
				data = null;
			} else {
				data = await response.json();
			}


			if (response.status === 401) {
				dispatch(authActions.logout());
				dispatch(profileActions.clearProfile());
			}

			if (!response.ok && data.errors) {
				setErrors(data.errors);
				isCustomError = true;
				throw new Error('Validation failed.');
			}

			if (!response.ok) {
				setErrorMsg(data.error);
				isCustomError = true;
				throw new Error(data.error || 'Something went wrong.');
			}

			return data;
		} catch (err: unknown) {
			if (err instanceof Error && isCustomError) {
				dispatch(setAlertWithTimeout({ type: 'error', message: err.message }));
			}

			throw err;
		} finally {
			setIsLoading(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const removeValidationError = (fieldName: string) => {
		setErrors(prevErrors => {
			const filteredErrors = prevErrors?.filter(err => err.field !== fieldName);

			if (filteredErrors?.length === 0 || typeof filteredErrors === 'undefined') {
				return null;
			}

			return filteredErrors;
		});
	};

	const errorsObj = errors?.reduce<{ [key: string]: string }>((accumulator, currentError) => {
		accumulator[currentError.field] = currentError.error;
		return accumulator;
	}, {});

	return {
		sendRequest,
		removeValidationError,
		isLoading,
		errors,
		errorsObject: errorsObj,
		errorMsg,
	};
};

export default useHTTP;
