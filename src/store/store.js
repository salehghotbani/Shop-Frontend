import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import homeSlice from './features/homeSlice';
import loginSlice from './features/loginSlice';
import registerSlice from './features/registerSlice';
import footerSlice from './features/footerSlice';
import productsSlice from './features/productsSlice';
import commentProduct from './features/commentProduct';
import questionProduct from './features/questionProduct';
import profileSlice from './features/profileSlice';
import dashboardSlice from './features/dashboardSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    home: homeSlice,
    login: loginSlice,
    register: registerSlice,
    footer: footerSlice,
    product: productsSlice,
    profile: profileSlice,
    commentProduct: commentProduct,
    questionProduct: questionProduct,
    dashboard: dashboardSlice,
  },
});

export default store;
