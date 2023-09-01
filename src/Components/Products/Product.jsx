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
  Text, useMediaQuery,
} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import {addToCart, backendURL, cookies, fetchWithAxios, ShowGLB, showToast} from '../../Base/BaseFunctions';
import {useDispatch, useSelector} from 'react-redux';
import {
  setProductDetails,
  setProductValues,
  setSameProducts,
} from '../../store/features/productsSlice';
import Zoom from 'react-img-zoom';
import {StarIcon} from '@chakra-ui/icons';
import componentIcon from '../../assets/icons/Design-Tools/vuesax/bold/component.svg';
import descriptionImage from '../../assets/images/product/Description.png';
import {useLocation, useNavigate} from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import {Comment} from './Comment';
import {Question} from './Question';
import standardLogo from '../../assets/images/standard.png';
import availabilityLogo from '../../assets/images/availability.png';

export const Product = () => {
  const dispatch = useDispatch();
  const product = useSelector(state => state.product);
  const user = useSelector(state => state.user);
  const [imageOfProduct, setImageOfProduct] = useState(null);
  const navigate = useNavigate();
  const [timeToShowSameProducts, setTimeToShowSameProducts] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  const getProductDetails = () => {
    fetchWithAxios.get(`/shop/getproddetails/?id=${queryParams.get('id')}`, {})
      .then(function (response) {
          dispatch(setProductDetails(response.data));
          setImageOfProduct(response.data.avatar);
        },
      ).catch((e) => {
      showToast('خطا', e.message);
    });
  };

  const getProductValues = () => {
    fetchWithAxios.get(`/shop/getprodvalues/?id=${queryParams.get('id')}`, {})
      .then(function (response) {
          dispatch(setProductValues(response.data));
        },
      ).catch((e) => {
      showToast('خطا', e.message);
    });
  };

  const getProductsByCategory = () => {
    fetchWithAxios.post(`/shop/getprodbyfilter/?id=${queryParams.get('category')}&page=1&count=7`, {})
      .then(function (response) {
          let tempArray = [];
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
      breakpoint: {max: 4000, min: 3000},
      items: 7,
    },
    desktop: {
      breakpoint: {max: 3000, min: 1300},
      items: 5,
    },
    desktop2: {
      breakpoint: {max: 1300, min: 1060},
      items: 4,
    },
    tablet: {
      breakpoint: {max: 1060, min: 800},
      items: 3,
    },
    mobile: {
      breakpoint: {max: 800, min: 570},
      items: 2,
    },
    small_mobile: {
      breakpoint: {max: 570, min: 0},
      items: 1,
    },
  };

  useEffect(() => {
    window.addEventListener('resize', () => setScreenWidth(window.innerWidth));
  }, [window.innerWidth]);

  const getZoomWidth = () => {
    if (screenWidth < 576) {
      return 200;
    } else if (screenWidth < 768) {
      return 250;
    } else if (screenWidth < 992) {
      return 300;
    } else if (screenWidth < 1200) {
      return 350;
    } else {
      return 400; // Default width for larger screens
    }
  };

  const getZoomHeight = () => {
    if (screenWidth < 576) {
      return 350;
    } else if (screenWidth < 768) {
      return 400;
    } else if (screenWidth < 992) {
      return 450;
    } else if (screenWidth < 1200) {
      return 550;
    } else {
      return 600; // Default height for larger screens
    }
  };

  const GetImageTop = () => (
    <Box mt={{base: 4, md: 0}} ml={{md: 6}}>
      {imageOfProduct !== null ?
        (imageOfProduct).toString().split('.')[(imageOfProduct).toString().split('.').length - 1] === 'glb' ?
          <ShowGLB autoRotate={true} image={backendURL + '/' + imageOfProduct}/>
          :
          <Box>
            <Zoom
              img={backendURL + '/' + imageOfProduct}
              zoomScale={1.5}
              width={getZoomWidth()}
              height={getZoomHeight()}
              transitionTime={0.5}
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </Box>
        :
        null
      }
    </Box>
  )

  const GetAddCartTop = () => (
    <Box mt={{base: 4, md: '1vh'}} ml={{md: 6}}>
      <Box borderRadius={7} dir={'rtl'} backgroundColor={'white'} py={3} px={4} className={'box_shadow'}>
        <Center>
          {imageOfProduct !== null && (imageOfProduct).toString().split('.')[(imageOfProduct).toString().split('.').length - 1] === 'glb' ?
            <ShowGLB autoRotate={false} image={backendURL + '/' + imageOfProduct}/>
            :
            <Box backgroundImage={backendURL + '/' + imageOfProduct} w={'200px'} h={'200px'} mx={2}
                 backgroundPosition={'center'} backgroundRepeat={'no-repeat'}
                 backgroundSize={'cover'}/>
          }
        </Center>
        <Box px={1} mt={1}>
          <Divider borderColor={'gray.400'}/>
        </Box>

        <Flex py={2}>
          <Image src={standardLogo} w={'auto'} h={'25px'} my={'auto'}/>
          <Text fontSize={'14px'} my={'auto'}>
            تضمین استاندارد و سلامت کالا
          </Text>
        </Flex>

        <Box px={1}>
          <Divider borderColor={'gray.400'}/>
        </Box>

        <Flex py={2}>
          <Image src={availabilityLogo} w={'auto'} h={'30px'} my={'auto'} mr={1.5} ml={2.5}/>
          <Text fontSize={'14px'} my={'auto'}>
            موجود در انبار
          </Text>
        </Flex>

        <Box px={1} mb={1}>
          <Divider borderColor={'gray.400'}/>
        </Box>

        <Text fontSize={'16px'} textAlign={'left'} mt={3}>
          قیمت: {product.productDetails.price !== undefined && parseInt((product.productDetails.price.toString()).replace(/,/g, '')).toLocaleString()} تومان
        </Text>

        <Center mt={5}>
          <Button width={'100%'} backgroundColor={'green.500'} _hover={{backgroundColor: 'green.600'}}
                  color={'white'}
                  onClick={() => {
                    if (user.isRegistered) {
                      addToCart(dispatch, product.productDetails.id);
                    } else {
                      navigate('/login');
                    }
                  }}>
            {user.isRegistered ? <>افزودن به سبد خرید</> : <>ورود به سایت</>}
          </Button>
        </Center>
      </Box>
    </Box>
  )

  return (
    <>
      <Box mt={8} px={['20px', '20px', '50px', '100px', '150px', '250px']} w={'100%'}>
        <Box display={{md: "flex"}} my={5}>
          <Center>
            {isMobile ? <GetImageTop/> : <GetAddCartTop/>}
          </Center>

          <Box mx={5} mt={{base: 4, md: 0}} ml={{md: 6}}>
            <Center>
              <Box w={['150px', '400px', '300px', '400px', '500px', '600px']} dir={'rtl'}>
                <Text fontSize={'25px'} as={'b'} mb={2} cursor={'default'}>{product.productDetails.name}</Text>
                <Divider borderColor={'gray.400'} mt={2}/>

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
                            <Image src={componentIcon} w={'15px'}/>
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
              </Box>
            </Center>
          </Box>

          <Center>
            {isMobile ? <GetAddCartTop/> : <GetImageTop/>}
          </Center>
        </Box>

        <Image src={descriptionImage}/>

        {product.sameProducts.length > 1 &&
          <Box my={6} px={5} pb={3} w={'100%'} borderWidth={1} borderRadius={8} className={'box_shadow'}>
            <Text fontSize={'20px'} dir={'rtl'} px={3} pt={3}>محصولات مشابه</Text>

            <Divider mt={1} mb={4} borderColor={'gray.400'}/>

            <Carousel responsive={responsive}>
              {timeToShowSameProducts && product.sameProducts.map((value, index) => {
                if (Number(queryParams.get('id')) !== Number(value.id)) {
                  return (
                    <Center>
                      <Box id={'id' + index} key={index} w={'200px'} h={'350px'} borderRadius={8}
                           cursor={'pointer'} borderWidth={1}
                           onClick={() => {
                             cookies.set('productId', value.id, {path: '/'});
                             navigate(`/productInfo?id=${value.id}&category=${queryParams.get('category')}`);
                             document.location.reload();
                           }}>
                        <Center>
                          <Box backgroundImage={backendURL + '/' + value.avatar} w={'200px'} h={'200px'} mx={2}
                               mt={'10px'} backgroundPosition={'center'} backgroundRepeat={'no-repeat'}
                               backgroundSize={'cover'}/>
                        </Center>
                        <Stack mx={5} mt={6}>
                          <Text fontSize={'18px'} as={'b'}>{value.name}</Text>
                          <Text fontSize={'16px'} textAlign={'left'}>
                            قیمت: {value.price !== undefined && parseInt((value.price.toString()).replace(/,/g, '')).toLocaleString()} تومان
                          </Text>
                        </Stack>
                      </Box>
                    </Center>
                  );
                } else {
                  return null;
                }
              })}
            </Carousel>
          </Box>
        }

        <Divider borderColor={'gray.400'}/>

        <Grid templateColumns='repeat(5, 1fr)' gap={8} mt={'20px'}>
          {!isMobile &&
            <GridItem minW={'200px'} maxW={'250px'} colSpan={1} w='100%' borderRadius={7}>
              <Box minW={'200px'} maxW={'250px'} pt={5} borderRadius={8} borderWidth={1} className={'box_shadow'}
                   dir={'rtl'} position={'sticky'} top={'80px'}>
                <Center minW={'200px'} maxW={'250px'}>
                  {imageOfProduct !== null && (imageOfProduct).toString().split('.')[(imageOfProduct).toString().split('.').length - 1] === 'glb' ?
                    <ShowGLB autoRotate={false} image={backendURL + '/' + imageOfProduct}/>
                    :
                    <Box backgroundImage={backendURL + '/' + imageOfProduct} minW={'200px'} maxW={'250px'} mx={2}
                         backgroundPosition={'center'} backgroundRepeat={'no-repeat'}
                         backgroundSize={'cover'}/>
                  }
                </Center>

                <Box mx={5}>
                  <Divider borderColor={'gray.400'}/>
                </Box>

                <Stack mx={5} mt={3}>
                  <Text fontSize={'18px'} as={'b'}>{product.productDetails.name}</Text>
                  <Text fontSize={'16px'} textAlign={'left'}>
                    قیمت: {product.productDetails.price !== undefined && parseInt((product.productDetails.price.toString()).replace(/,/g, '')).toLocaleString()} تومان
                  </Text>
                </Stack>

                <Center mx={2} my={4}>
                  <Button size={'sm'} width={'100%'} backgroundColor={'green.500'} color={'white'}
                          _hover={{backgroundColor: 'green.600'}}
                          onClick={() => {
                            if (user.isRegistered) {
                              addToCart(dispatch, product.productDetails.id);
                            } else {
                              navigate('/login');
                            }
                          }}>
                    {user.isRegistered ? <>افزودن به سبد خرید</> : <>ورود به سایت</>}
                  </Button>
                </Center>
              </Box>
            </GridItem>
          }

          <GridItem colSpan={isMobile ? 5 : 4} w='100%' dir={'rtl'}>
            <Box className={'box_shadow'} borderRadius={7} p={5}>
              <Text as={'b'} fontSize={'20px'}>مشخصات:</Text>

              <Divider mt={1} mb={4} borderColor={'gray.400'}/>

              <Stack spacing={'0.5px'} mt={2}>
                {Object.keys(product.productValues).map((key) => (
                  <Flex>
                    <Image src={componentIcon} w={'15px'}/>
                    <Flex>
                      <Text mx={1} cursor={'default'} as={'b'}>{key}:</Text>
                      <Text cursor={'default'}>{product.productValues[key]}</Text>
                    </Flex>
                  </Flex>
                ))}
              </Stack>
            </Box>

            <Divider mb={'20px'} borderColor={'gray.400'}/>
            <Comment/>

            <Divider mb={'20px'} borderColor={'gray.400'}/>
            <Question/>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};
