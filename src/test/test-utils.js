import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import threadReducer from '../features/threads/threadsSlice';

export const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      auth: authReducer,
      thread: threadReducer,
    },
    preloadedState,
  });
};
