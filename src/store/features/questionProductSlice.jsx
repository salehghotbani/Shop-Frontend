import { createSlice } from '@reduxjs/toolkit';

const questionProductSlice = createSlice({
  name: 'footer',
  initialState: {
    questionForSend: '',
    questions: [],
  },
  reducers: {
    setQuestionForSend: (state, action) => {
      state.questionForSend = action.payload;
    },
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
  },
});

export const {
  setQuestionForSend,
  setQuestions,
} = questionProductSlice.actions;

export default questionProductSlice.reducer;
