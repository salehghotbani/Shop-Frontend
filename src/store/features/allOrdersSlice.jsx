import { createSlice } from '@reduxjs/toolkit';

const allOrdersSlice = createSlice({
  name: 'commentProduct',
  initialState: {
    orders: [],
  },
  reducers: {
    setAllOrders: (state, action) => {
      state.orders = action.payload;
    },
  },
});

export const {
  setAllOrders,
} = allOrdersSlice.actions;

export default allOrdersSlice.reducer;
