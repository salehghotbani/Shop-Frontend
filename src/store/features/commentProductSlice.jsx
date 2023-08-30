import { createSlice } from '@reduxjs/toolkit';

const commentProductSlice = createSlice({
  name: 'commentProduct',
  initialState: {
    title: '',
    description: '',
    rate: 0,
    positivePoint: [],
    negativePoint: [],
    comments: [],
    page: 1,
    numberElementShownPerPage: 5,
    totalProductsByFiltersAndCategory: 1,
  },
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setRate: (state, action) => {
      state.rate = action.payload;
    },
    setPositivePoint: (state, action) => {
      state.positivePoint = action.payload;
    },
    setNegativePoint: (state, action) => {
      state.negativePoint = action.payload;
    },
    setComments: (state, action) => {
      state.comments = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setNumberElementShownPerPage: (state, action) => {
      state.numberElementShownPerPage = action.payload;
    },
    setTotalProductsByFiltersAndCategory: (state, action) => {
      state.totalProductsByFiltersAndCategory = action.payload;
    },
  },
});

export const {
  setTitle,
  setDescription,
  setRate,
  setPositivePoint,
  setNegativePoint,
  setComments,
  setPage,
  setNumberElementShownPerPage,
  setTotalProductsByFiltersAndCategory,
} = commentProductSlice.actions;

export default commentProductSlice.reducer;
