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

  const getHero = () => {
    fetchWithAxios.get('/shop/gethero/', {})
      .then(function(response) {
          dispatch(setHeroTitle(response.data.title));
          dispatch(setHeroDescription(response.data.long_text));
        },
      ).catch((e) => {
      showToast('خطا', e.message);
    });
  };

  const getMiddle = () => {
    fetchWithAxios.get('/shop/gethero/', {})
      .then(function(response) {
          dispatch(setMiddleTitle(response.data.title));
          dispatch(setMiddleDescription(response.data.long_text));
          // dispatch(setProductsCategorization());
          // dispatch(setCompaniesIcons());
        },
      ).catch((e) => {
      showToast('خطا', e.message);
    });
  };

  const getCompanies = () => {
    fetchWithAxios.get('/shop/getimgfoot/', {})
      .then(function(response) {
          let tempArray = [];
          response.data.imagefoot.map((value) => {
            tempArray.push(value.image)
          });
          // dispatch(setProductsCategorization());
          dispatch(setCompaniesIcons(tempArray));
        },
      ).catch((e) => {
      showToast('خطا', e.message);
    });
  };

  useEffect(() => {
    getHero();
    getMiddle();
    getCompanies();
  }, []);

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
