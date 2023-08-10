import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    category: [{}],
    amazingProducts: [{}],
    bestSellingProducts: [{}],
    productListFilter: { priceRange: [1000000, 2000000], brand: '' },
  },
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setAmazingProducts: (state, action) => {
      state.amazingProducts = action.payload;
    },
    setBestSellingProducts: (state, action) => {
      state.bestSellingProducts = action.payload;
    },
    setProductListFilter: (state, action) => {
      state.productListFilter = action.payload;
    },
  },
});

export const {
  setCategory,
  setAmazingProducts,
  setBestSellingProducts,
  setProductListFilter,
} = productsSlice.actions;

export default productsSlice.reducer;
