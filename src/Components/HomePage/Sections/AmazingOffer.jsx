import { Box, Center, Flex, Tag, Text } from '@chakra-ui/react';
import Carousel from 'react-multi-carousel';
import { useSelector } from 'react-redux';
import { backendURL, cookies, ProductSimple } from '../../../Base/BaseFunctions';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const AmazingOffer = () => {
  const product = useSelector(state => state.product);
  const navigate = useNavigate();
  const user = useSelector(state => state.user);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1300 },
      items: 4,
    },
    desktop2: {
      breakpoint: { max: 1300, min: 1060 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1060, min: 800 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 800, min: 570 },
      items: 1,
    },
    small_mobile: {
      breakpoint: { max: 570, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <Box>
        {product.amazingProducts.length ?
          <>
            <Flex justify={'flex-end'} px={7}>
              <Tag py={5} px={8} my={8} borderRadius={'50px'} backgroundColor={'#1C3347'}>
                <Center>
                  <Text cursor={'default'} dir={'rtl'} fontSize={'25px'} textColor={'white'} as={'b'}>
                    پیشنهاد شگفت انگیز
                  </Text>
                </Center>
              </Tag>
            </Flex>

            <Carousel responsive={responsive}>
              {product.amazingProducts.map((value, index) => (
                <Box key={index}>
                  <ProductSimple image={backendURL + '/' + value.avatar} name={value.name} user={user} navigate={navigate}
                                 onClickEvent={() => {
                                   cookies.set('productId', value.id, { path: '/' });
                                   navigate(`/productInfo?id=${value.id}&category=${product.selectedCategory}`);
                                 }}
                                 price={value.price && parseInt((value.price.toString()).replace(/,/g, '')).toLocaleString()} />
                </Box>
              ))}
            </Carousel>
          </>
          :
          null
        }
      </Box>
    </>
  );
};
