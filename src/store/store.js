import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import homeSlice from './features/homeSlice';
import loginSlice from './features/loginSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    home: homeSlice,
    login:loginSlice,
  },
});

export default store;
