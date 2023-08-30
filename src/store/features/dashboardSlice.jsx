import { createSlice } from '@reduxjs/toolkit';
import { PROFILE_DASHBOARD } from '../../Components/Dashboard/DashboardSections';

const dashboardSlice = createSlice({
  name: 'footer',
  initialState: {
    dashboardSection: PROFILE_DASHBOARD,
    isInReview: false,
  },
  reducers: {
    setDashboardSection: (state, action) => {
      state.dashboardSection = action.payload;
    },
    setIsInReview: (state, action) => {
      state.isInReview = action.payload;
    },
  },
});

export const {
  setDashboardSection,
  setIsInReview,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
