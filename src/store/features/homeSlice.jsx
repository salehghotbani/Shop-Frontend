import { createSlice } from '@reduxjs/toolkit';

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    heroTitle: '',
    heroDescription: '',
    productsCategorization: [],
    middleTitle: '',
    middleDescription: '',
    companiesIcons: [],
  },
  reducers: {
    setHeroTitle: (state, action) => {
      state.heroTitle = action.payload;
    },
    setHeroDescription: (state, action) => {
      state.heroDescription = action.payload;
    },
    setProductsCategorization: (state, action) => {
      state.productsCategorization = action.payload;
    },
    setMiddleTitle: (state, action) => {
      state.middleTitle = action.payload;
    },
    setMiddleDescription: (state, action) => {
      state.middleDescription = action.payload;
    },
    setCompaniesIcons: (state, action) => {
      state.companiesIcons = action.payload;
    },
  },
});

export const {
  setHeroTitle,
  setHeroDescription,
  setProductsCategorization,
  setMiddleTitle,
  setMiddleDescription,
  setCompaniesIcons,
} = homeSlice.actions;

export default homeSlice.reducer;
