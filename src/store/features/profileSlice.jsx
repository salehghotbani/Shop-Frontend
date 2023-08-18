import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    username: '',
    firstName: '',
    lastName: '',
    gender: true,
    phoneNumber: '',
    email: '',
    address: '',
  },
  reducers: {
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action) => {
      state.lastName = action.payload;
    },
    setGender: (state, action) => {
      state.gender = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
  },
});

export const {
  setUsername,
  setPhoneNumber,
  setEmail,
  setGender,
  setFirstName,
  setLastName,
  setAddress,
} = profileSlice.actions;

export default profileSlice.reducer;
