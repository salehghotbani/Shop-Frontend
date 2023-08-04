import { Box, Center, Image } from '@chakra-ui/react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useState } from 'react';
import companyImage from '../../../assets/images/home page/company.jpg';

export const Companies = () => {
  const [elements, setElements] = useState([
    {
      'image': companyImage,
    },
    {
      'image': companyImage,
    },
    {
      'image': companyImage,
    },
    {
      'image': companyImage,
    },
    {
      'image': companyImage,
    },
    {
      'image': companyImage,
    },
  ]);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
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
      <Box>
        <Carousel responsive={responsive}>
          {elements.map((value) => (
            <Center>
              <Image src={value.image} h={'208px'} />
            </Center>
          ))}
        </Carousel>
      </Box>
    </>
  );
};
