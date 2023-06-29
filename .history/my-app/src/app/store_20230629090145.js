import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
const middleware = [...getDefaultMiddleware(), logger];

const store = configureStore({
  reducer: {

  },
  middleware: middleware,
});

export default store;
export * from '../features/auth/authSlice';