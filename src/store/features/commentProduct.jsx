import { createSlice } from '@reduxjs/toolkit';

const commentProduct = createSlice({
  name: 'commentProduct',
  initialState: {
    title: '',
    description: '',
    rate: 0,
    positivePoint: [],
    negativePoint: [],
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
  },
});

export const {
  setTitle,
  setDescription,
  setRate,
  setPositivePoint,
  setNegativePoint,
} = commentProduct.actions;

export default commentProduct.reducer;
