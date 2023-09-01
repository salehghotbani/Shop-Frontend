import {createSlice} from "@reduxjs/toolkit";

const timerSlice = createSlice({
  name: 'captcha',
  initialState: {
    timer: '00:00',
    timeStart: true,
  },
  reducers: {
    setTimer: (state, action) => {
      state.timer = action.payload;
    },
    setTimeStart: (state, action) => {
      state.timeStart = action.payload;
    },
  }
});

export const {
  setTimer,
  setTimeStart,
} = timerSlice.actions;

export default timerSlice.reducer;
