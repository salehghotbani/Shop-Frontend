import { createSlice } from '@reduxjs/toolkit';

const infoSlice = createSlice({
  name: 'info',
  initialState: {
    username: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    code: [],

  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setConfirmPassword: (state, action) => {
      state.confirmPassword = action.payload;
    },
    setCode: (state, action) => {
      state.code = action.payload;
    },
  },
});

export const {
  setUsername,
  setPhoneNumber,
  setEmail,
  setPassword,
  setConfirmPassword,
  setCode,
} = infoSlice.actions;

export default infoSlice.reducer;
