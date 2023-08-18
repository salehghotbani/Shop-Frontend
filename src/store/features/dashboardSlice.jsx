import { createSlice } from '@reduxjs/toolkit';
import { PROFILE_DASHBOARD } from '../../Base/DashboardSections';

const dashboardSlice = createSlice({
  name: 'footer',
  initialState: {
    dashboardSection: PROFILE_DASHBOARD,
  },
  reducers: {
    setDashboardSection: (state, action) => {
      state.dashboardSection = action.payload;
    },
  },
});

export const {
  setDashboardSection,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
