import { createSlice } from '@reduxjs/toolkit';

const questionProduct = createSlice({
  name: 'questionProduct',
  initialState: {
    question: '',
  },
  reducers: {
    setQuestion: (state, action) => {
      state.question = action.payload;
    },
  },
});

export const {
  setQuestion,
} = questionProduct.actions;

export default questionProduct.reducer;
