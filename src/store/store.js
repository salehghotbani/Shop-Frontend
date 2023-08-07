import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import homeSlice from './features/homeSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    home: homeSlice,
  },
});

export default store;
