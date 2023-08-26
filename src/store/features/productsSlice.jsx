import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    category: [],
    amazingProducts: [],
    bestSellingProducts: [],
    productListFilter: { priceRange: [0, 2000000], brand: '' },
    maximumAmountFilter: 1,
    brandNames: [],
    selectedCategory: 0,
    page: 1,
    numberElementShownPerPage: 10,
    products: [],
    productValues: {},
    productDetails: {},
    sameProducts: [],
    totalProductsByFiltersAndCategory: 0,
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
    setMaximumAmountFilter: (state, action) => {
      state.maximumAmountFilter = action.payload;
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
    setProductValues: (state, action) => {
      state.productValues = action.payload;
    },
    setProductDetails: (state, action) => {
      state.productDetails = action.payload;
    },
    setSameProducts: (state, action) => {
      state.sameProducts = action.payload;
    },
    setTotalProductsByFiltersAndCategory: (state, action) => {
      state.totalProductsByFiltersAndCategory = action.payload;
    },
  },
});

export const {
  setCategory,
  setAmazingProducts,
  setBestSellingProducts,
  setProductListFilter,
  setMaximumAmountFilter,
  setBrandNames,
  setSelectedCategory,
  setPage,
  setNumberElementShownPerPage,
  setProducts,
  setProductValues,
  setProductDetails,
  setSameProducts,
  setTotalProductsByFiltersAndCategory,
} = productsSlice.actions;

export default productsSlice.reducer;
