import { Hero } from './Sections/Hero';
import { ProductsCategorization } from './Sections/ProductsCategorization';
import { Description } from './Sections/Description';
import { AmazingOffer } from './Sections/AmazingOffer';
import { BestSellingProducts } from './Sections/BestSellingProducts';
import { Companies } from './Sections/Companies';
import { Box } from '@chakra-ui/react';
import { Footer } from '../Footer';
import React, { useEffect } from 'react';
import { fetchWithAxios, showToast } from '../../BaseFunctions';
import {
  setCompaniesIcons,
  setHeroDescription,
  setHeroTitle,
  setMiddleDescription,
  setMiddleTitle,
  setProductsCategorization,
} from '../../store/features/homeSlice';
import { useDispatch } from 'react-redux';

export const HomePage = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   fetchWithAxios.get('/verify_code/', {})
  //     .then(function(response) {
  //         dispatch(setHeroTitle());
  //         dispatch(setHeroDescription());
  //         dispatch(setMiddleTitle());
  //         dispatch(setMiddleDescription());
  //         dispatch(setProductsCategorization());
  //         dispatch(setCompaniesIcons());
  //       },
  //     ).catch((e) => {
  //     showToast('خطا', e.message);
  //   });
  // }, []);

  return (
    <>
      <Hero />
      <ProductsCategorization />
      <Description />
      <Box>
        <AmazingOffer />
        <BestSellingProducts />
      </Box>
      <Companies />
      <Footer />
    </>
  );
};
