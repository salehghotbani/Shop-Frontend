import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Grid,
  GridItem,
  Icon,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { addToCart, backendURL, cookies, fetchWithAxios, showToast } from '../../Base/BaseFunctions';
import { useDispatch, useSelector } from 'react-redux';
import {
  setProductDetails,
  setProductValues,
  setSameProducts,
} from '../../store/features/productsSlice';
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei';
import { Show3DGLB } from './Show3DGLB';
import { Canvas } from '@react-three/fiber';
import Zoom from 'react-img-zoom';
import { StarIcon } from '@chakra-ui/icons';
import componentIcon from '../../assets/icons/Design-Tools/vuesax/bold/component.svg';
import descriptionImage from '../../assets/images/product/Description.png';
import { useLocation, useNavigate } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import { Comment } from './Comment';
import { Question } from './Question';
import standardLogo from '../../assets/images/standard.png';
import availabilityLogo from '../../assets/images/availability.png';

export const Product = () => {
  const dispatch = useDispatch();
  const product = useSelector(state => state.product);
  const [imageOfProduct, setImageOfProduct] = useState(null);
  const navigate = useNavigate();
  const [timeToShowSameProducts, setTimeToShowSameProducts] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

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

  const getProductsByCategory = () => {
    fetchWithAxios.post(`/shop/getprodbyfilter/?id=${queryParams.get('category')}&page=1&count=7`, {})
      .then(function(response) {
          let tempArray = [];
          console.log('***********', response.data);
          response.data.products.map((value) => {
            tempArray.push(value);
          });
          dispatch(setSameProducts(tempArray));
          setTimeToShowSameProducts(true);
        },
      ).catch((e) => {
      showToast('خطا', e.message);
    });
  };

  useEffect(() => {
    getProductDetails();
    getProductValues();
    getProductsByCategory();
  }, []);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 7,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
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
      <Box mt={8} px={'250px'}>
        <Grid templateColumns='repeat(8, 1fr)' gap={8}>
          <GridItem colSpan={2} w='100%' my={'70px'}>
            <Box borderRadius={7} dir={'rtl'} backgroundColor={'white'} py={3} px={4} className={'box_shadow'}>
              <Center>
                <Box backgroundImage={backendURL + '/' + imageOfProduct} w={'200px'} h={'200px'} mx={2}
                     backgroundPosition={'center'} backgroundRepeat={'no-repeat'}
                     backgroundSize={'cover'} />
              </Center>
              <Box px={1} mt={1}>
                <Divider borderColor={'gray.400'} />
              </Box>

              <Flex py={2}>
                <Image src={standardLogo} w={'auto'} h={'25px'} my={'auto'} />
                <Text fontSize={'14px'} my={'auto'}>
                  تضمین استاندارد و سلامت کالا
                </Text>
              </Flex>

              <Box px={1}>
                <Divider borderColor={'gray.400'} />
              </Box>

              <Flex py={2}>
                <Image src={availabilityLogo} w={'auto'} h={'30px'} my={'auto'} mr={1.5} ml={2.5} />
                <Text fontSize={'14px'} my={'auto'}>
                  موجود در انبار
                </Text>
              </Flex>

              <Box px={1} mb={1}>
                <Divider borderColor={'gray.400'} />
              </Box>

              <Text fontSize={'16px'} textAlign={'left'} mt={3}>
                قیمت: {product.productDetails.price !== undefined && parseInt((product.productDetails.price.toString()).replace(/,/g, '')).toLocaleString()} تومان
              </Text>

              <Center mt={5}>
                <Button width={'100%'} backgroundColor={'green.500'} _hover={{ backgroundColor: 'green.600' }}
                        color={'white'} onClick={() => addToCart(dispatch, product.productDetails.id)}>
                  افزودن به سبد خرید
                </Button>
              </Center>
            </Box>
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
                {Object.keys(product.productValues).map((key, index) => {
                  if (index < 8) {
                    return (
                      <Flex key={index}>
                        <Image src={componentIcon} w={'15px'} />
                        <Flex>
                          <Text mx={1} cursor={'default'} as={'b'}>{key}:</Text>
                          <Text cursor={'default'}>{product.productValues[key]}</Text>
                        </Flex>
                      </Flex>
                    );
                  } else {
                    return <></>;
                  }
                })}
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
                    width={510}
                    height={700}
                    transitionTime={0.5}
                  />
                </Box>
              :
              null
            }
          </GridItem>
        </Grid>

        <Image src={descriptionImage} />

        {product.sameProducts.length > 1 &&
          <Box my={6} px={5} pb={3} w={'100%'} borderWidth={1} borderRadius={8} className={'box_shadow'}>
            <Text fontSize={'20px'} dir={'rtl'} px={3} pt={3}>محصولات مشابه</Text>

            <Divider mt={1} mb={4} borderColor={'gray.400'} />

            <Carousel responsive={responsive}>
              {timeToShowSameProducts && product.sameProducts.map((value, index) => {
                if (Number(queryParams.get('id')) !== Number(value.id)) {
                  return (
                    <Box id={'id' + index} key={index} w={'200px'} h={'350px'} borderRadius={8}
                         cursor={'pointer'} borderWidth={1}
                         onClick={() => {
                           cookies.set('productId', value.id, { path: '/' });
                           navigate(`/productInfo?id=${value.id}&category=${queryParams.get('category')}`);
                           document.location.reload();
                         }}>
                      <Center>
                        <Box backgroundImage={backendURL + '/' + value.avatar} w={'200px'} h={'200px'} mx={2}
                             mt={'10px'} backgroundPosition={'center'} backgroundRepeat={'no-repeat'}
                             backgroundSize={'cover'} />
                      </Center>
                      <Stack mx={5} mt={6}>
                        <Text fontSize={'18px'} as={'b'}>{value.name}</Text>
                        <Text fontSize={'16px'} textAlign={'left'}>
                          قیمت: {value.price !== undefined && parseInt((value.price.toString()).replace(/,/g, '')).toLocaleString()} تومان
                        </Text>
                      </Stack>
                    </Box>
                  );
                } else {
                  return null;
                }
              })}
            </Carousel>
          </Box>
        }

        <Divider borderColor={'gray.400'} />

        <Grid templateColumns='repeat(5, 1fr)' gap={8} mt={'20px'}>
          <GridItem colSpan={1} w='100%' borderRadius={7}>
            <Box minW={'200px'} maxW={'250px'} pt={5} borderRadius={8} borderWidth={1} className={'box_shadow'}
                 dir={'rtl'} position={'sticky'} top={'80px'}>
              <Center>
                <Box backgroundImage={backendURL + '/' + imageOfProduct} w={'200px'} h={'200px'} mx={2}
                     backgroundPosition={'center'} backgroundRepeat={'no-repeat'}
                     backgroundSize={'cover'} />
              </Center>

              <Box mx={5}>
                <Divider borderColor={'gray.400'} />
              </Box>

              <Stack mx={5} mt={3}>
                <Text fontSize={'18px'} as={'b'}>{product.productDetails.name}</Text>
                <Text fontSize={'16px'} textAlign={'left'}>
                  قیمت: {product.productDetails.price !== undefined && parseInt((product.productDetails.price.toString()).replace(/,/g, '')).toLocaleString()} تومان
                </Text>
              </Stack>

              <Center mx={2} my={4}>
                <Button size={'sm'} width={'100%'} backgroundColor={'green.500'} color={'white'}
                        _hover={{ backgroundColor: 'green.600' }}
                        onClick={() => addToCart(dispatch, product.productDetails.id)}>
                  افزودن به سبد خرید
                </Button>
              </Center>
            </Box>
          </GridItem>

          <GridItem colSpan={4} w='100%' dir={'rtl'}>
            <Box className={'box_shadow'} borderRadius={7} p={5}>
              <Text as={'b'} fontSize={'20px'}>مشخصات:</Text>

              <Divider mt={1} mb={4} borderColor={'gray.400'} />

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

            <Divider mb={'20px'} borderColor={'gray.400'} />
            <Comment />

            <Divider mb={'20px'} borderColor={'gray.400'} />
            <Question />
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};
