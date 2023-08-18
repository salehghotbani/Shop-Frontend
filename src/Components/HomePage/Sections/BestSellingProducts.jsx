import { Box, Center, Flex, Stack, Tag, Text } from '@chakra-ui/react';
import Carousel from 'react-multi-carousel';
import { useSelector } from 'react-redux';
import { backendURL, cookies } from '../../../Base/BaseFunctions';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const BestSellingProducts = () => {
  const product = useSelector(state => state.product);
  const navigate = useNavigate();
  const listId = 'id_best_selling_';

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
      items: 5,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
    },
  };

  return (
    <>
      <Box>
        {product.bestSellingProducts.length ?
          <>
            <Box>
              <Flex justify={'flex-end'} px={7}>
                <Tag py={5} px={8} my={8} borderRadius={'50px'} backgroundColor={'#8FA5D1'}>
                  <Center>
                    <Text cursor={'default'} dir={'rtl'} fontSize={'25px'} textColor={'black'} as={'b'}>
                      محصولات پر فروش
                    </Text>
                  </Center>
                </Tag>
              </Flex>
            </Box>

            <Carousel responsive={responsive}>
              {product.bestSellingProducts.map((value, index) => (
                <Center key={index}>
                  <Box id={listId + index} w={'260px'} h={'470px'} borderRadius={8}
                       cursor={'pointer'} borderWidth={1} my={8}
                       onClick={() => {
                         cookies.set('productId', value.id, { path: '/' });
                         navigate(`/productInfo?id=${value.id}&category=${product.selectedCategory}`);
                       }}
                       onMouseEnter={() => {
                         document.getElementById(listId + index).classList.add('box_shadow');
                       }}
                       onMouseLeave={() => {
                         document.getElementById(listId + index).classList.remove('box_shadow');
                       }}>
                    <Center>
                      <Box backgroundImage={backendURL + '/' + value.avatar} w={'240px'} h={'240px'} mt={'30px'}
                           backgroundPosition={'center'} backgroundRepeat={'no-repeat'} backgroundSize={'cover'} />
                    </Center>
                    <Stack mx={5} mt={6}>
                      <Text fontSize={'18px'} as={'b'}>{value.name}</Text>
                      <Text fontSize={'16px'} textAlign={'left'}>
                        قیمت: {value.price !== undefined && parseInt((value.price.toString()).replace(/,/g, '')).toLocaleString()} تومان
                      </Text>
                    </Stack>
                  </Box>
                </Center>
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
