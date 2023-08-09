import { createSlice } from '@reduxjs/toolkit';

const footerSlice = createSlice({
  name: 'footer',
  initialState: {
    eNamads: [{}],
  },
  reducers: {
    setENamads: (state, action) => {
      state.eNamads = action.payload;
    },
  },
});

export const {
  setENamads,
} = footerSlice.actions;

export default footerSlice.reducer;
