import { createSlice } from '@reduxjs/toolkit';

const questionProductSlice = createSlice({
  name: 'footer',
  initialState: {
    questionForSend: '',
    questions: [],
    page: 1,
    numberElementShownPerPage: 5,
    totalProductsByFiltersAndCategory: 1,
  },
  reducers: {
    setQuestionForSend: (state, action) => {
      state.questionForSend = action.payload;
    },
    setQuestions: (state, action) => {
      state.questions = action.payload;
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
  setQuestionForSend,
  setQuestions,
  setPage,
  setNumberElementShownPerPage,
  setTotalProductsByFiltersAndCategory,
} = questionProductSlice.actions;

export default questionProductSlice.reducer;
