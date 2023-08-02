import { Hero } from './Sections/Hero';
import { ProductsCategorization } from './Sections/ProductsCategorization';
import { Description } from './Sections/Description';
import { AmazingOffer } from './Sections/AmazingOffer';
import { BestSellingProducts } from './Sections/BestSellingProducts';
import { Companies } from './Sections/Companies';

export const HomePage = () => {
  return (
    <>
      <Hero />
      <ProductsCategorization />
      <Description />
      <AmazingOffer />
      <BestSellingProducts />
      <Companies />
    </>
  );
};
