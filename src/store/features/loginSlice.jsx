import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    password:'',
    username:'',
  },
  reducers: {
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },

  },
});

export const { setPassword, setUsername } = loginSlice.actions;
export default loginSlice.reducer;
