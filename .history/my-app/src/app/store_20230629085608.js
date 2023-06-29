import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../features/auth/authSlice';
import orderHistoryReducer from '../features/orderHistory/OrderHistorySlice';
import orderDetailsReducer from '../features/orderHistory/OrderDetailsSlice';
import checkoutSliceReducer from '../features/cart/checkoutSlice';
import savedCartReducer from '../features/cart/cartSlice';
import userDetailsReducer from '../features/user/userSlice';

const middleware = [...getDefaultMiddleware(), logger];

const store = configureStore({
  reducer: {
    auth: authReducer,
    orderHistory: orderHistoryReducer,
    orderDetails: orderDetailsReducer,
    checkout: checkoutSliceReducer,
    savedCart: savedCartReducer,
    userDetails: userDetailsReducer
  },
  middleware: middleware,
});

export default store;
export * from '../features/auth/authSlice';