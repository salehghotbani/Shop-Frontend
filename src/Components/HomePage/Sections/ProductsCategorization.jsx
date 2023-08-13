import { SimpleGrid, Text, Box, Center } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { backendURL } from '../../../BaseFunctions';
import { setProductListFilter, setSelectedCategory } from '../../../store/features/productsSlice';
import { useNavigate } from 'react-router-dom';

export const ProductsCategorization = () => {
  const product = useSelector(state => state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <Box backgroundColor={'#1C3347'} py={'40px'}>
        <Center>
          <Box px={8} py={3} bg={'white'} borderRadius={50} mb={7}>
            <Text color={'black'} fontSize={'4xl'}>دسته بندی محصولات</Text>
          </Box>
        </Center>

        <SimpleGrid align={'center'} spacing={9} columns={[2, 2, 4, 4]}>
          {product.category.map((value, index) => {
            console.log('id', value);
            if (index <= 8) {
              return (
                <Center key={index}>
                  <Box position={'relative'} display='flex' justifyContent='center' alignItems='center' w={'300px'}
                       h={'250px'} cursor={'pointer'}
                       onClick={() => {
                         dispatch(setSelectedCategory(value.id));
                         dispatch(setProductListFilter({
                           priceRange: [product.productListFilter.priceRange[0], product.productListFilter.priceRange[1]],
                           brand: '',
                         }));
                         navigate(`/products?category=${value.id}&page=${product.page}`);
                       }}>
                    <Box position={'absolute'} backgroundImage={backendURL + '/' + value.image}
                         backgroundPosition={'center'} backgroundRepeat={'no-repeat'} backgroundSize={'cover'}
                         borderRadius={'20px'} w={'300px'} h={'250px'} filter='brightness(0.6)'
                         className={'box_shadow'} />
                    <Center filter='brightness(1)' p={2}>
                      <Text fontSize={'50px'} color={'white'}>{value.title}</Text>
                    </Center>
                  </Box>
                </Center>
              );
            } else {
              return <></>;
            }
          })}
        </SimpleGrid>
      </Box>
    </>
  );
};
