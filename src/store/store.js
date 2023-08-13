import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import homeSlice from './features/homeSlice';
import loginSlice from './features/loginSlice';
import registerSlice from './features/registerSlice';
import footerSlice from './features/footerSlice';
import productsSlice from './features/productsSlice';
import infoSlice from './features/infoSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    home: homeSlice,
    login: loginSlice,
    register: registerSlice,
    footer: footerSlice,
    product: productsSlice,
    info:infoSlice,
  },
});

export default store;
