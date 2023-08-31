import {
  backendURL,
  fetchWithAxios,
  getCartStatus,
  GregorianToJalaliConverter,
  ShowGLB,
  showToast,
} from '../../../Base/BaseFunctions';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsSubmitted } from '../../../store/features/profileSlice';
import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { setAllOrders } from '../../../store/features/allOrdersSlice';
import Carousel from 'react-multi-carousel';
import { useLocation, useNavigate } from 'react-router-dom';
import { setIsInReview } from '../../../store/features/dashboardSlice';

const OrderComponent = ({ order }) => {
  const [imageOfProducts, setImageOfProducts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getImageOrdersAxios = async (orderId) => {
    try {
      const response = await fetchWithAxios.get(`/delivery/getprodfororder?order_id=${orderId}`, {});
      return response.data.products;
    } catch (e) {
      showToast('خطا', e.message);
      dispatch(setIsSubmitted(false));
      return [];
    }
  };

  const fetchImageOfProducts = async () => {
    try {
      const response = await getImageOrdersAxios(order.id);
      setImageOfProducts(response);
    } catch (e) {
      showToast('خطا', e.message);
      dispatch(setIsSubmitted(false));
    }
  };

  useEffect(() => {
    fetchImageOfProducts().then(null);
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 7,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1300 },
      items: 5,
    },
    desktop2: {
      breakpoint: { max: 1300, min: 1060 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1060, min: 800 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 800, min: 570 },
      items: 2,
    },
    small_mobile: {
      breakpoint: { max: 570, min: 0 },
      items: 1,
    },
  };

  return (
    <Box dir={'rtl'}>
      <Carousel responsive={responsive}>
        {imageOfProducts.map((products_images_value, products_images_index) => {
          if (products_images_value.avatar.toString().includes('.glb')) {
            return (
              <Tooltip hasArrow label={products_images_value.name} bg='blue.200' color='black'>
                <Box key={order.id + products_images_index}>
                  <ShowGLB autoRotate={false} image={backendURL + '/' + products_images_value.avatar} />
                </Box>
              </Tooltip>
            );
          } else {
            return (
              <Tooltip hasArrow label={products_images_value.name} bg='blue.200' color='black'>
                <Box
                  key={order.id + products_images_index}
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
        })}
      </Carousel>
    </Box>
  );
};

export const AllOrders = () => {
  const dispatch = useDispatch();
  const allOrders = useSelector(state => state.allOrders);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const getAllOrdersAxios = () => {
    fetchWithAxios.get(`/delivery/getallorders`, {})
      .then((response) => {
        dispatch(setAllOrders(response.data.orders));
      }).catch((e) => {
      showToast('خطا', e.message);
      dispatch(setIsSubmitted(false));
    });
  };

  useEffect(() => {
    if (queryParams.has('order_id')) {
      dispatch(setIsInReview(true));
    } else {
      dispatch(setIsInReview(false));
      getAllOrdersAxios();
    }
  }, []);

  return (
    <Box h={'89vh'} borderRadius={'30px'} className={'box_shadow'} dir={'ltr'} p={5} overflowY={'auto'}>
      {allOrders.orders && allOrders.orders.map((value, index) => (
        <Box dir={'rtl'} key={index} className={'box_shadow'} my={2} borderRadius={'20px'} p={5}>
          <Grid templateColumns='repeat(6, 1fr)' gap={4}>
            <GridItem colStart={1} colEnd={2}>
              <Flex>
                <Text>تاریخ سفارش:</Text>

                <Box my={'auto'} mx={2}>
                  <GregorianToJalaliConverter gregorianDate={value.date} />
                </Box>
              </Flex>
            </GridItem>

            <GridItem colStart={3} colEnd={4}>
              <Flex>
                <Text>مجموع هزینه:</Text>

                <Text mx={2} fontSize={'16px'}>
                  {parseInt((value.total.toString()).replace(/,/g, '')).toLocaleString()} تومان
                </Text>
              </Flex>
            </GridItem>

            <GridItem colStart={5} colEnd={6}>
              <Flex>
                <Text>وضعیت سفارش:</Text>

                <Text mx={2} fontSize={'16px'}>
                  {getCartStatus(value.order_state)}
                </Text>
              </Flex>
            </GridItem>

            <GridItem colStart={6} colEnd={7} dir={'ltr'} mx={2} mb={1}>
              <Button my={'auto'} backgroundColor={'cyan.600'} _hover={{ backgroundColor: 'cyan.700' }} size={'sm'}
                      color={'white'}
                      onClick={() => {
                        queryParams.set('order_id', value.id);
                        const updatedSearch = queryParams.toString();
                        navigate({ search: updatedSearch });

                        dispatch(setIsInReview(true));
                      }}>
                مرور
              </Button>
            </GridItem>
          </Grid>

          <Divider borderColor={'gray.400'} />

          <Box borderRadius={'20px'} borderWidth={1} m={3} p={2}>
            <OrderComponent order={value} />
          </Box>
        </Box>
      ))}
    </Box>
  );
};
