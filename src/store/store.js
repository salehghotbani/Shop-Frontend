import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import homeSlice from './features/homeSlice';
import loginSlice from './features/loginSlice';
import registerSlice from './features/registerSlice';
import footerSlice from './features/footerSlice';
import productsSlice from './features/productsSlice';
import profileSlice from './features/profileSlice';
import dashboardSlice from './features/dashboardSlice';
import questionProductSlice from './features/questionProductSlice';
import commentProductSlice from './features/commentProductSlice';
import cartSlice from './features/cartSlice';
import allOrdersSlice from './features/allOrdersSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    home: homeSlice,
    login: loginSlice,
    register: registerSlice,
    footer: footerSlice,
    product: productsSlice,
    profile: profileSlice,
    commentProduct: commentProductSlice,
    questionProduct: questionProductSlice,
    dashboard: dashboardSlice,
    cart: cartSlice,
    allOrders: allOrdersSlice,
  },
});

export default store;
