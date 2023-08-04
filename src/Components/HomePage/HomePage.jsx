import { Hero } from './Sections/Hero';
import { ProductsCategorization } from './Sections/ProductsCategorization';
import { Description } from './Sections/Description';
import { AmazingOffer } from './Sections/AmazingOffer';
import { BestSellingProducts } from './Sections/BestSellingProducts';
import { Companies } from './Sections/Companies';
import { Box } from '@chakra-ui/react';
import { Footer } from '../Footer';
import React from 'react';

export const HomePage = () => {
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
