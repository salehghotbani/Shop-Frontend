import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    category: [{}],
    amazingProducts: [{}],
    bestSellingProducts: [{}],
    productListFilter: { priceRange: [0, 2000000], brand: '' },
    brandNames: [],
    selectedCategory: 0,
    page: 1,
    numberElementShownPerPage: 10,
    products: [{}],
    timeToSendRequest: 0,
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
    setBrandNames: (state, action) => {
      state.brandNames = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setNumberElementShownPerPage: (state, action) => {
      state.numberElementShownPerPage = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setTimeToSendRequest: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const {
  setCategory,
  setAmazingProducts,
  setBestSellingProducts,
  setProductListFilter,
  setBrandNames,
  setSelectedCategory,
  setPage,
  setNumberElementShownPerPage,
  setProducts,
  setTimeToSendRequest,
} = productsSlice.actions;

export default productsSlice.reducer;
