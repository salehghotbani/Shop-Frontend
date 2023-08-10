import { Box } from '@chakra-ui/react';
import Carousel from 'react-multi-carousel';
import { useSelector } from 'react-redux';
import { backendURL } from '../../../BaseFunctions';

export const Companies = () => {
  const home = useSelector(state => state.home);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 7,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <Carousel responsive={responsive}>
        {home.companiesIcons.map((value) => (
          <Box my={9} mx={'40px'} py={5} backgroundImage={backendURL + '/' + value} backgroundSize={'cover'}
               backgroundRepeat={'no-repeat'} backgroundPosition={'center'} h={'208px'} />
        ))}
      </Carousel>
    </>
  );
};
