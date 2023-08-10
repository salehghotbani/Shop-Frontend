import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    isRegistered: false,
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setRegistrationStatus: (state, action) => {
      state.isRegistered = action.payload;
    },
  },
});

export const {
  setUsername,
  setRegistrationStatus,
} = userSlice.actions;

export default userSlice.reducer;
