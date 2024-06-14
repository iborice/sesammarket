import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import saleReducer from '../slices/saleSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    sale: saleReducer
  }
})
export default store