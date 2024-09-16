import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { setAlertWithTimeout } from './alert-slice';
import { AppDispatch, RootState } from './store';
import { IProfile } from '../interfaces/mongoose-models';
import { authActions } from './auth-slice';

interface IProfileSlice {
	profile: null | IProfile;
	repos: unknown | null;
	isLoading: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchUserProfile = createAsyncThunk<any, void, { dispatch: AppDispatch; state: RootState }>(
	'profile/fetchUserProfile',
	async (_, thunkApi) => {
		try {
			const state = thunkApi.getState();
			const userToken = state.auth.jwt;
			if (!userToken) throw new Error('Something went wrong. Please log in again.');

			const response = await fetch(`${import.meta.env.VITE_API_PREFIX}/api/profiles/me`, {
				method: 'GET',
				headers: { Authorization: `Bearer ${userToken}` },
			});

			const data = await response.json();

			if (response.status === 401) {
				thunkApi.dispatch(authActions.logout());
				thunkApi.dispatch(profileActions.clearProfile());
			}

			if (!response.ok) throw new Error(data.error || 'Something went wrong.');

			return data;
		} catch (err: unknown) {
			if (err instanceof Error) {
				thunkApi.dispatch(setAlertWithTimeout({ type: 'error', message: err.message }));
				console.error(err.message);
			}
			return thunkApi.rejectWithValue({ message: 'Error occured.' });
		}
	}
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deleteProfileExperience = createAsyncThunk<any, string, { dispatch: AppDispatch; state: RootState }>(
	'profile/deleteProfileExperience',
	async (experienceId: string, thunkApi) => {
		try {
			const state = thunkApi.getState();
			const userToken = state.auth.jwt;
			if (!userToken) throw new Error('Something went wrong. Please log in again.');

			const response = await fetch(`${import.meta.env.VITE_API_PREFIX}/api/profiles/experience/${experienceId}`, {
				method: 'DELETE',
				headers: { Authorization: `Bearer ${userToken}` },
			});
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			let data: null | any;
			if (response.status === 204) {
				data = null;
			} else {
				data = await response.json();
			}

			if (response.status === 401) {
				thunkApi.dispatch(authActions.logout());
				thunkApi.dispatch(profileActions.clearProfile());
			}
			if (!response.ok) throw new Error(data.error || 'Something went wrong.');

			thunkApi.dispatch(setAlertWithTimeout({ type: 'success', message: 'The experience has been removed.' }));
			return { experienceId };
		} catch (err: unknown) {
			if (err instanceof Error) {
				thunkApi.dispatch(setAlertWithTimeout({ type: 'error', message: err.message }));
				console.error(err);
			}
			return thunkApi.rejectWithValue({ message: 'Error occured.' });
		}
	}
);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deleteProfileEducation = createAsyncThunk<any, string, { dispatch: AppDispatch; state: RootState }>(
	'profile/deleteProfileEducation',
	async (educationId: string, thunkApi) => {
		try {
			const state = thunkApi.getState();
			const userToken = state.auth.jwt;
			if (!userToken) throw new Error('Something went wrong. Please log in again.');

			const response = await fetch(`${import.meta.env.VITE_API_PREFIX}/api/profiles/education/${educationId}`, {
				method: 'DELETE',
				headers: { Authorization: `Bearer ${userToken}` },
			});
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			let data: null | any;
			if (response.status === 204) {
				data = null;
			} else {
				data = await response.json();
			}

			if (response.status === 401) {
				thunkApi.dispatch(authActions.logout());
				thunkApi.dispatch(profileActions.clearProfile());
			}
			if (!response.ok) throw new Error(data.error || 'Something went wrong.');

			thunkApi.dispatch(setAlertWithTimeout({ type: 'success', message: 'The education has been removed.' }));
			return { educationId };
		} catch (err: unknown) {
			if (err instanceof Error) {
				thunkApi.dispatch(setAlertWithTimeout({ type: 'error', message: err.message }));
				console.error(err);
			}
			return thunkApi.rejectWithValue({ message: 'Error occured.' });
		}
	}
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deleteAccount = createAsyncThunk<any, void, { dispatch: AppDispatch; state: RootState }>(
	'profile/deleteAccount',
	async (_, thunkApi) => {
		try {
			const state = thunkApi.getState();
			const userToken = state.auth.jwt;
			if (!userToken) throw new Error('Something went wrong. Please log in again.');

			const response = await fetch(`${import.meta.env.VITE_API_PREFIX}/api/profiles`, {
				method: 'DELETE',
				headers: { Authorization: `Bearer ${userToken}` },
			});
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			let data: null | any;
			if (response.status === 204) {
				data = null;
			} else {
				data = await response.json();
			}

			if (response.status === 401) {
				thunkApi.dispatch(authActions.logout());
				thunkApi.dispatch(profileActions.clearProfile());
			} else if (response.status === 204) {
				thunkApi.dispatch(authActions.logout());
			}
			if (!response.ok) throw new Error(data.error || 'Something went wrong.');

			thunkApi.dispatch(
				setAlertWithTimeout({ type: 'warning', message: 'Your account and profile have been deleted.' })
			);
			return;
		} catch (err: unknown) {
			if (err instanceof Error) {
				thunkApi.dispatch(setAlertWithTimeout({ type: 'error', message: err.message }));
				console.error(err);
			}
			return thunkApi.rejectWithValue({ message: 'Error occured.' });
		}
	}
);

const initialState: IProfileSlice = {
	profile: null,
	repos: null,
	isLoading: true,
};

const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		clearProfile: () => {
			return initialState;
		},
		updateProfile: (state, action: PayloadAction<IProfile>) => {
			state.profile = action.payload;
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
			state.profile = action.payload;
			state.isLoading = false;
		});
		builder.addCase(fetchUserProfile.rejected, state => {
			state.isLoading = false;
		});

		builder.addCase(deleteProfileExperience.pending, state => {
			state.isLoading = true;
		});
		builder.addCase(deleteProfileExperience.fulfilled, (state, action) => {
			state.isLoading = false;
			if (!state.profile?.experience) return state;
			state.profile.experience = state.profile.experience.filter(exp => exp._id !== action.payload.experienceId);
		});
		builder.addCase(deleteProfileExperience.rejected, state => {
			state.isLoading = false;
		});

		builder.addCase(deleteProfileEducation.pending, state => {
			state.isLoading = true;
		});
		builder.addCase(deleteProfileEducation.fulfilled, (state, action) => {
			state.isLoading = false;
			if (!state.profile?.education) return state;
			state.profile.education = state.profile.education.filter(
				education => education._id !== action.payload.educationId
			);
		});
		builder.addCase(deleteProfileEducation.rejected, state => {
			state.isLoading = false;
		});

		builder.addCase(deleteAccount.pending, state => {
			state.isLoading = true;
		});
		builder.addCase(deleteAccount.fulfilled, () => {
			return initialState;
		});
		builder.addCase(deleteAccount.rejected, state => {
			state.isLoading = false;
		});
	},
});

export const profileActions = profileSlice.actions;
export default profileSlice.reducer;
