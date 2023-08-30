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
  Divider,
  Flex,
  Grid,
  GridItem,
  Text,
} from '@chakra-ui/react';
import { setAllOrders } from '../../../store/features/allOrdersSlice';
import Carousel from 'react-multi-carousel';

const OrderComponent = ({ order }) => {
  const [imageOfProducts, setImageOfProducts] = useState([]);
  const dispatch = useDispatch();

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
    fetchImageOfProducts();
  }, [order.id]);

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
              <Box key={order.id + products_images_index}>
                <ShowGLB autoRotate={false} image={backendURL + '/' + products_images_value.avatar} />
              </Box>
            );
          } else {
            return (
              <Box
                key={order.id + products_images_index}
                backgroundImage={`url(${backendURL}/${products_images_value.avatar})`}
                w={'200px'} h={'200px'} mx={2}
                backgroundPosition={'center'} backgroundRepeat={'no-repeat'}
                backgroundSize={'cover'}
              />
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
    getAllOrdersAxios();
  }, []);

  return (
    <Box maxH={'89vh'} borderRadius={'30px'} className={'box_shadow'} dir={'ltr'} p={5} overflowY={'auto'}>
      {allOrders.orders && allOrders.orders.map((value, index) => (
        <Box dir={'rtl'} key={index} className={'box_shadow'} my={2} borderRadius={'20px'} p={2}>
          <Grid templateColumns='repeat(5, 1fr)' gap={4}>
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
          </Grid>

          <Divider borderColor={'gray.400'} />

          <Box borderRadius={'20px'} borderWidth={1} m={3} p={2}>
            <OrderComponent key={index} order={value} />
          </Box>
        </Box>
      ))}
    </Box>
  );
};
