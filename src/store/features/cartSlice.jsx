import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'commentProduct',
  initialState: {
    totalPrice: 0,
    products: [],
  },
  reducers: {
    setTotalPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const {
  setTotalPrice,
  setProducts,
} = cartSlice.actions;

export default cartSlice.reducer;
