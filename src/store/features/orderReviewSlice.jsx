import { createSlice } from '@reduxjs/toolkit';

const orderReviewSlice = createSlice({
  name: 'orderReview',
  initialState: {
    details: {},
    star: 0,
  },
  reducers: {
    setDetails: (state, action) => {
      state.details = action.payload;
    },
    setStar: (state, action) => {
      state.star = action.payload;
    },
  },
});

export const {
  setDetails,
  setStar,
} = orderReviewSlice.actions;

export default orderReviewSlice.reducer;
