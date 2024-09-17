import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUser } from '../interfaces/mongoose-models';
import { AppDispatch, RootState } from './store';
import { setAlertWithTimeout } from './alert-slice';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchUserBasedOnToken = createAsyncThunk<any, void, { dispatch: AppDispatch; state: RootState }>(
	'auth/fetchUserBasedOnToken',
	async (_, thunkApi) => {
		try {
			const state = thunkApi.getState();
			const userToken = state.auth.jwt;
			if (!userToken) throw new Error('Something went wrong. Please log in again.');

			const response = await fetch(`${import.meta.env.VITE_API_PREFIX}/api/auth`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${userToken}`,
				},
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || 'Something went wrong. Please log in again.');
			}

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

interface IAuthState {
	jwt: string | null;
	isAuthenticated: boolean;
	user: IUser | null;
}

const initialState: IAuthState = {
	jwt: localStorage.getItem('jwt') || null,
	isAuthenticated: false,
	user: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (_, action: PayloadAction<IAuthState>) => {
			localStorage.setItem('jwt', action.payload.jwt!);
			return action.payload;
		},
		logout: () => {
			localStorage.removeItem('jwt');
			return {
				jwt: null,
				isAuthenticated: false,
				user: null,
			};
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchUserBasedOnToken.fulfilled, (state, action) => {
			state.isAuthenticated = true;
			state.user = action.payload.user;
		});

		builder.addCase(fetchUserBasedOnToken.rejected, () => {
			localStorage.removeItem('jwt');
			return {
				jwt: null,
				isAuthenticated: false,
				user: null,
			};
		});
	},
});

export default authSlice.reducer;

export const authActions = authSlice.actions;
