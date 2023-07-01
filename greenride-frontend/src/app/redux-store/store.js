import { configureStore } from '@reduxjs/toolkit';

import authenticationReducer from './authenticationSlice';
import userSlice from './userSlice';

/**
 * To configure the store redux.
 *
 * @author Peter Mollet
 */
export const store = configureStore({
  reducer: {
    auth: authenticationReducer,
    user: userSlice,
  },
});
