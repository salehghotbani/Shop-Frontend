import {
  addToCart,
  backendURL,
  createOrderIdPay,
  fetchWithAxios,
  getCartStatus,
  GregorianToJalaliConverter,
  removeFromCart,
  ShowGLB,
  showToast,
} from '../../../Base/BaseFunctions';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Image,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { setIsInReview } from '../../../store/features/dashboardSlice';
import { setDetails } from '../../../store/features/orderReviewSlice';
import { StarRating } from '../../Products/StarRating';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import standardLogo from '../../../assets/images/standard.png';
import availabilityLogo from '../../../assets/images/availability.png';

const OrderProducts = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const getImageOrdersAxios = async (orderId) => {
    try {
      const response = await fetchWithAxios.get(`/delivery/getprodfororder?order_id=${queryParams.get('order_id')}`, {});
      return response.data.products;
    } catch (e) {
      showToast('خطا', e.message);
      return [];
    }
  };

  const fetchImageOfProducts = async () => {
    try {
      const response = await getImageOrdersAxios();
      setProducts(response);
    } catch (e) {
      showToast('خطا', e.message);
    }
  };

  useEffect(() => {
    fetchImageOfProducts().then(null);
  }, []);

  const GetImageOfProduct = ({ products_images_value, products_images_index }) => {
    if (products_images_value.avatar.toString().includes('.glb')) {
      return (
        <Tooltip hasArrow label={products_images_value.name} bg='blue.200' color='black'>
          <Box key={queryParams.get('order_id') + products_images_index}>
            <ShowGLB autoRotate={false} image={backendURL + '/' + products_images_value.avatar} />
          </Box>
        </Tooltip>
      );
    } else {
      return (
        <Tooltip hasArrow label={products_images_value.name} bg='blue.200' color='black'>
          <Box
            key={queryParams.get('order_id') + products_images_index}
            backgroundImage={`url(${backendURL}/${products_images_value.avatar})`}
            w={'200px'} h={'200px'} mx={2}
            backgroundPosition={'center'}
            backgroundRepeat={'no-repeat'}
            backgroundSize={'cover'}
            cursor={'pointer'}
            onClick={() => navigate(`/productInfo?id=${products_images_value.id}&category=${products_images_value.category}`)}
          />
        </Tooltip>
      );
    }
  };

  return (
    <Box templateColumns='repeat(4, 1fr)' gap={5} p={'30px'} maxH={'80vh'} overflowY={'auto'}>
      {products.map((products_images_value, products_images_index) => (
        <>
          <Grid templateColumns='repeat(4, 1fr)' gap={5} p={'30px'} borderRadius={'30px'} className={'box_shadow'}
                mb={3}>
            <GridItem colSpan={1} dir={'rtl'}>
              <GetImageOfProduct products_images_value={products_images_value}
                                 products_images_index={products_images_index} />
            </GridItem>

            <GridItem colSpan={3} dir={'rtl'} borderRadius={'30px'}>
              <Text as={'b'} fontSize={'17px'} cursor={'pointer'}
                    onClick={() => {
                      navigate(`/productInfo?id=${products_images_value.id}&category=${products_images_value.category_id}`);
                      window.location.reload();
                    }}>
                {products_images_value.name}
              </Text>
              <Divider my={1} borderRadius={8} borderColor={'black'} />

              <Box mt={6} mb={2}>
                <Flex>
                  <Image src={standardLogo} w={'auto'} h={'25px'} my={'auto'} />
                  <Box my={'auto'}>
                    <Text fontSize={'14px'}>
                      تضمین استاندارد و سلامت کالا
                    </Text>
                    <Text fontSize={'14px'}>
                      تضمین اصالت کالا
                    </Text>
                  </Box>
                </Flex>

                <Flex mt={2}>
                  <Image src={availabilityLogo} w={'auto'} h={'30px'} my={'auto'} mr={1.5} ml={2.5} />
                  <Text fontSize={'14px'} my={'auto'}>
                    موجود در انبار
                  </Text>
                </Flex>
              </Box>

              <Divider my={3} borderRadius={8} borderColor={'black'} />

              <Flex>
                <Text mx={2} as={'b'} fontSize={'16px'}>
                  قیمت محصول:
                </Text>

                <Text as={'b'} fontSize={'16px'}>
                  {products_images_value.price && parseInt((products_images_value.price.toString()).replace(/,/g, '')).toLocaleString()} تومان
                </Text>
              </Flex>
            </GridItem>
          </Grid>
        </>
      ))}
    </Box>
  );
};

export const OrderReview = () => {
  const dispatch = useDispatch();
  const orderReview = useSelector(state => state.orderReview);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const postStarAxios = () => {
    if (orderReview.star !== 0) {
      fetchWithAxios.get(`/delivery/poststar?order_id=${queryParams.get('order_id')}`, {
        'star': orderReview.star,
      })
        .then((response) => {
            window.location.reload();
          },
        )
        .catch((e) => {
          showToast('خطا', e.message);
        });
    }
  };

  const getOneOrderAxios = () => {
    fetchWithAxios.get(`/delivery/getoneorder?order_id=${queryParams.get('order_id')}`, {})
      .then(function(response) {
          dispatch(setDetails(response.data));
        },
      ).catch((e) => {
      showToast('خطا', e.message);
      queryParams.delete('order_id');
      navigate({ search: queryParams.toString() });
      dispatch(setIsInReview(false));
    });
  };

  useEffect(() => {
    if (queryParams.has('order_id')) {
      dispatch(setIsInReview(true));
      getOneOrderAxios();
    } else {
      dispatch(setIsInReview(false));
    }
  }, []);

  return (
    <Box h={'89vh'} p={'30px'} dir={'rtl'}>
      <Grid templateColumns='repeat(8, 1fr)' gap={4}>
        <GridItem colStart={1} colEnd={3} my={'auto'}>
          <Flex>
            <Text as={'b'}>تاریخ سفارش:</Text>

            <Box my={'auto'} mx={2} fontSize={'16px'}>
              <GregorianToJalaliConverter gregorianDate={orderReview.details.date} />
            </Box>
          </Flex>
        </GridItem>

        <GridItem colStart={3} colEnd={5} my={'auto'}>
          <Flex>
            <Text as={'b'}>مجموع هزینه:</Text>

            <Text mx={2} fontSize={'16px'}>
              {orderReview.details.total && parseInt((orderReview.details.total.toString()).replace(/,/g, '')).toLocaleString()} تومان
            </Text>
          </Flex>
        </GridItem>

        <GridItem colStart={5} colEnd={7} my={'auto'}>
          <Flex>
            <Text as={'b'}>وضعیت سفارش:</Text>

            <Text mx={2} fontSize={'16px'}>
              {orderReview.details.order_state && getCartStatus(orderReview.details.order_state)}
            </Text>
          </Flex>
        </GridItem>

        <GridItem colStart={(!orderReview.details.Isstar) && orderReview.details.order_state !== 'PENP' ? 7 : 8}
                  colEnd={9} my={'auto'} dir={'ltr'}>
          {orderReview.details.Isstar ?
            <Center><Text dir={'rtl'}>شما به این سفارش امتیاز داده‌اید!</Text></Center>
            :
            orderReview.details.order_state === 'PENP' ?
              orderReview.details.total &&
              <>
                <Button dir={'rtl'} size={'sm'} mt={3} w={'100%'} backgroundColor={'green.500'}
                        _hover={{ backgroundColor: 'green.600' }} color={'white'}
                        onClick={() => createOrderIdPay(queryParams.get('order_id'), orderReview.details.total, navigate)}>
                  <Text>پرداخت</Text>
                </Button>
              </>
              :
              <Flex dir={'rtl'}>
                <Button mx={2} backgroundColor={'green.500'} _hover={{ backgroundColor: 'green.600' }}
                        onClick={postStarAxios}>
                  ثبت
                </Button>
                <StarRating />
              </Flex>
          }
        </GridItem>
      </Grid>
      <Divider mt={1} borderColor={'gray.400'} />

      <OrderProducts />
    </Box>
  );
};

// {
//   "id": 4,
//   "address": "",
//   "customer": 3,
//   "date": "2023-08-24T19:11:41.281639+03:30",
//   "order_state": "PENP",
//   "cart": 2,
//   "total": 2093000,
//   "Isstar": false,
//   "products": [
//   1,
//   4,
//   5,
//   6
// ]
// }
