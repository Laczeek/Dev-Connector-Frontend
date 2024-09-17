import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from './store';

type IAlertState = { type: 'warning' | 'error' | 'success'; message: string } | null;

const initialState = null as unknown as IAlertState;

export const alertSlice = createSlice({
	name: 'alert',
	initialState,
	reducers: {
		setAlert: (_, action: PayloadAction<IAlertState>) => {
			return action.payload;
		},
		removeAlert: () => {
			return initialState;
		},
	},
});

const alertSliceActions = alertSlice.actions;

export default alertSlice.reducer;

let timeout: number | null;

// async thunk
export const setAlertWithTimeout = (alert: IAlertState) => (dispatch: AppDispatch) => {
	if (timeout) {
		clearTimeout(timeout);
		dispatch(alertSliceActions.removeAlert());
	}

	dispatch(alertSliceActions.setAlert(alert));

	timeout = setTimeout(() => {
		timeout = null;
		dispatch(alertSliceActions.removeAlert());
	}, 3000);
};
