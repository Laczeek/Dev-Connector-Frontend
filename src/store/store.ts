import { configureStore } from '@reduxjs/toolkit';

import alertSlice from './alert-slice';
import authSlice from './auth-slice';
import profileSlice from './profile.slice';

/* eslint-disable no-underscore-dangle */
const store = configureStore({
	reducer: {
		alert: alertSlice,
		auth: authSlice,
		profile: profileSlice,
	},
});
/* eslint-enable */


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
