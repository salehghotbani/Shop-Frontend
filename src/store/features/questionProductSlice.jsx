import { createSlice } from '@reduxjs/toolkit';

const questionProductSlice = createSlice({
  name: 'footer',
  initialState: {
    questionForSend: '',
  },
  reducers: {
    setQuestionForSend: (state, action) => {
      state.questionForSend = action.payload;
    },
  },
});

export const {
  setQuestionForSend,
} = questionProductSlice.actions;

export default questionProductSlice.reducer;
