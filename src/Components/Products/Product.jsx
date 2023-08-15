import {
  Box, Button, Divider, Flex, Grid, GridItem, Icon, Image, Stack, Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { backendURL, cookies, fetchWithAxios, showToast } from '../../Base/BaseFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { setProductDetails, setProductValues } from '../../store/features/productsSlice';
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei';
import { Show3DGLB } from './Show3DGLB';
import { Canvas } from '@react-three/fiber';
import Zoom from 'react-img-zoom';
import { StarIcon } from '@chakra-ui/icons';
import componentIcon from '../../assets/icons/Design-Tools/vuesax/bold/component.svg';

export const Product = () => {
  const dispatch = useDispatch();
  const product = useSelector(state => state.product);
  const [imageOfProduct, setImageOfProduct] = useState(null);

  const getProductDetails = () => {
    fetchWithAxios.get(`/shop/getproddetails/?id=${cookies.get('productId')}`, {})
      .then(function(response) {
          dispatch(setProductDetails(response.data));
          setImageOfProduct(response.data.avatar);
        },
      ).catch((e) => {
      showToast('خطا', e.message);
    });
  };

  const getProductValues = () => {
    fetchWithAxios.get(`/shop/getprodvalues/?id=${cookies.get('productId')}`, {})
      .then(function(response) {
          dispatch(setProductValues(response.data));
        },
      ).catch((e) => {
      showToast('خطا', e.message);
    });
  };

  useEffect(() => {
    getProductDetails();
    getProductValues();
  }, []);

  return (
    <>
      <Box mt={8} px={'250px'} h={'580px'}>
        <Grid templateColumns='repeat(8, 1fr)' gap={8}>
          <GridItem colSpan={2} w='100%' my={'70px'} borderRadius={7}>
            <Button>
              افزودن به سبد خرید
            </Button>
          </GridItem>

          <GridItem colSpan={3} w='100%' h={'700px'} dir={'rtl'} mt={5}>
            <Text fontSize={'25px'} as={'b'} mb={2} cursor={'default'}>{product.productDetails.name}</Text>
            <Divider borderColor={'gray.400'} mt={2} />

            <Flex mt={1}>
              <Flex>
                <Icon
                  my={'auto'}
                  as={StarIcon}
                  boxSize={3}
                  color={'yellow.400'}
                />
                <Text fontSize={'14px'} mx={1} my={'auto'} cursor={'default'}>4.2</Text>
              </Flex>
              <Text mx={2} cursor={'default'}>-</Text>
              <Text cursor={'default'}>0 دیدگاه</Text>
            </Flex>

            <Box mt={3}>
              <Text as={'b'} fontSize={'17px'} cursor={'default'}>ویژگی‌ها</Text>

              <Stack spacing={'0.5px'} mt={2}>
                {Object.keys(product.productValues).map((key) => (
                  <Flex>
                    <Image src={componentIcon} w={'15px'} />
                    <Flex>
                      <Text mx={1} cursor={'default'} as={'b'}>{key}:</Text>
                      <Text cursor={'default'}>{product.productValues[key]}</Text>
                    </Flex>
                  </Flex>
                ))}
              </Stack>
            </Box>
          </GridItem>

          <GridItem colSpan={3} w='100%' h={'700px'}>
            {imageOfProduct !== null ?
              (imageOfProduct).toString().split('.')[(imageOfProduct).toString().split('.').length - 1] === 'glb' ?
                <>
                  <Canvas shadows camera={{ position: [0, 0.2, 0.4] }}>
                    <Environment preset='forest' />
                    <Show3DGLB />
                    <ContactShadows position={[0, -0.8, 0]} color='#ffffff' />
                    <OrbitControls autoRotate />
                  </Canvas>
                  <Show3DGLB />
                </>
                :
                <Box>
                  <Zoom
                    img={backendURL + '/' + imageOfProduct}
                    zoomScale={1.5}
                    width={650}
                    height={700}
                  />
                </Box>
              :
              null
            }
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};
