import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import homeSlice from './features/homeSlice';
import loginSlice from './features/loginSlice';
import registerSlice from './features/registerSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    home: homeSlice,
    login: loginSlice,
    register: registerSlice,
  },
});

export default store;
