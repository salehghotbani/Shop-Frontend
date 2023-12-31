import { Hero } from './Sections/Hero';
import { ProductsCategorization } from './Sections/ProductsCategorization';
import { Description } from './Sections/Description';
import { AmazingOffer } from './Sections/AmazingOffer';
import { BestSellingProducts } from './Sections/BestSellingProducts';
import { Companies } from './Sections/Companies';
import { Box } from '@chakra-ui/react';
import { Footer } from '../Footer';
import React, { useEffect } from 'react';
import { fetchWithAxios, showToast } from '../../Base/BaseFunctions';
import {
  setCompaniesIcons,
  setHeroDescription,
  setHeroTitle,
  setMiddleDescription,
  setMiddleTitle,
} from '../../store/features/homeSlice';
import { useDispatch } from 'react-redux';
import { setAmazingProducts, setBestSellingProducts } from '../../store/features/productsSlice';
import backImage from '../../assets/images/home page/back.png';

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
    fetchWithAxios.get('/shop/getmiddle/', {})
      .then(function(response) {
          dispatch(setMiddleTitle(response.data.title));
          dispatch(setMiddleDescription(response.data.long_text));
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
            tempArray.push(value.image);
          });
          dispatch(setCompaniesIcons(tempArray));
        },
      ).catch((e) => {
      showToast('خطا', e.message);
    });
  };

  const getAmazingOffers = () => {
    fetchWithAxios.get('/shop/getwonderprod/', {})
      .then(function(response) {
          let tempArray = [];
          response.data.products.map((value) => {
            value.map((valueInJson) => {
              tempArray.push({
                id: valueInJson.id,
                name: valueInJson.name,
                avatar: valueInJson.avatar,
                category: valueInJson.category,
                price: valueInJson.price,
              });
            });
          });
          dispatch(setAmazingProducts(tempArray));
        },
      ).catch((e) => {
      showToast('خطا', e.message);
    });
  };

  const getMostSellProduct = () => {
    fetchWithAxios.get('/shop/getmostsellprod/', {})
      .then(function(response) {
          let tempArray = [];
          response.data.products.map((value) => {
            tempArray.push({
              id: value.id,
              name: value.name,
              avatar: value.avatar,
              category: value.category,
              price: value.price,
            });
          });
          dispatch(setBestSellingProducts(tempArray));
        },
      ).catch((e) => {
      showToast('خطا', e.message);
    });
  };

  useEffect(() => {
    getHero();
    getMiddle();
    getCompanies();
    getAmazingOffers();
    getMostSellProduct();
  }, []);

  return (
    <>
      <Hero />
      <ProductsCategorization />
      <Description />
      <Box backgroundImage={backImage} backgroundPosition={'center'} backgroundRepeat={'no-repeat'}
           backgroundSize={'cover'} w={'100%'}>
        <AmazingOffer />
        <BestSellingProducts />
      </Box>
      <Companies />
      <Footer />
    </>
  );
};
