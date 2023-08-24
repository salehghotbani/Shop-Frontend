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
  Stack,
  Text,
} from '@chakra-ui/react';
import {
  addToCart,
  backendURL,
  fetchWithAxios,
  getProductsCart,
  removeFromCart,
  showToast,
} from '../../Base/BaseFunctions';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import standardLogo from '../../assets/images/standard.png';
import availabilityLogo from '../../assets/images/availability.png';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import componentIcon from '../../assets/icons/Design-Tools/vuesax/bold/component.svg';
import { useNavigate } from 'react-router-dom';

export const GetCart = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getProductsCart(dispatch);
  }, []);

  return (
    cart.products.map((value, index) => (
      <Box key={'product_in_card_' + index} className={'box_shadow'} my={2} borderRadius={'20px'}>
        <Grid templateColumns='repeat(4, 1fr)' gap={5} p={'30px'}>
          <GridItem colSpan={1} dir={'rtl'}>
            <Center borderRadius={'30px'} p={5}>
              <Box cursor={'pointer'} backgroundImage={backendURL + '/' + value.avatar} w={'200px'}
                   h={'200px'} backgroundPosition={'center'} backgroundRepeat={'no-repeat'}
                   backgroundSize={'cover'}
                   onClick={() => {
                     navigate(`/productInfo?id=${value.id}&category=${value.category_id}`);
                     window.location.reload();
                   }} />
            </Center>
          </GridItem>

          <GridItem colSpan={3} dir={'rtl'} borderRadius={'30px'}>
            <Text as={'b'} fontSize={'17px'} cursor={'pointer'}
                  onClick={() => {
                    navigate(`/productInfo?id=${value.id}&category=${value.category_id}`);
                    window.location.reload();
                  }}>
              {value.name}
            </Text>
            <Divider my={1} borderRadius={8} borderColor={'black'} />

            <FormControl my={'auto'} isRequired ml={5} mt={3}>
              <Flex>
                <FormLabel my={'auto'}>
                  <Text as={'b'}>تعداد:</Text>
                </FormLabel>
                <NumberInput size='sm' maxW={24} defaultValue={value.quantity} min={0}
                             onChange={(event) => {
                               console.log(event);
                               if (event < value.quantity) {
                                 removeFromCart(dispatch, value.id);
                               } else {
                                 addToCart(dispatch, value.id);
                               }
                             }}>
                  <NumberInputField borderRadius={6} dir={'ltr'} readOnly cursor={'default'} />
                  <NumberInputStepper borderRadius={6}>
                    <NumberIncrementStepper children={<AddIcon w={'10px'} color={'green.600'} />} />
                    <NumberDecrementStepper children={<MinusIcon color={'red.600'} />} />
                  </NumberInputStepper>
                </NumberInput>
              </Flex>
            </FormControl>

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
                {parseInt((value.price.toString()).replace(/,/g, '')).toLocaleString()} تومان
              </Text>
            </Flex>
          </GridItem>
        </Grid>
      </Box>
    ))
  );
};

export const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  useEffect(() => {
    getProductsCart(dispatch);
  }, []);

  const createOrder = () => {
    fetchWithAxios.get('/delivery/createorder/', {})
      .catch((e) => {
        showToast('خطا', e.message);
      });
  };

  return (
    <>
      <Grid h={'89vh'} templateColumns='repeat(7, 1fr)' gap={5} p={'30px'}>
        <GridItem colSpan={2} dir={'rtl'}>
          <Box p={5} borderRadius={8} className={'box_shadow'}>
            <Text as={'b'} fontSize={'18px'}>قیمت نهایی</Text>
            <Divider my={1} borderRadius={8} borderColor={'black'} />

            <Stack mt={2} spacing={1}>
              {!cart.totalPrice &&
                <Text fontSize={'16px'}>محصولی انتخاب نکرده اید🙃</Text>
              }
              {cart.products.map((value, index) => (
                <Grid key={index} templateColumns='repeat(4, 1fr)' gap={1}>
                  <GridItem colSpan={2} dir={'rtl'}>
                    <Flex>
                      <Image src={componentIcon} w={'15px'} />
                      <Text mx={2}>{value.name}</Text>
                      <Text dir={'ltr'}>{value.quantity} x</Text>
                    </Flex>
                  </GridItem>

                  <GridItem colSpan={2} dir={'ltr'}>
                    <Flex>
                      <Text>تومان</Text>
                      <Text mx={2}>
                        {parseInt(((Number(value.price) * Number(value.quantity)).toString()).replace(/,/g, '')).toLocaleString()}
                      </Text>
                    </Flex>
                  </GridItem>
                </Grid>
              ))}
            </Stack>

            {cart.totalPrice &&
              <>
                <Divider my={1} borderRadius={8} borderColor={'black'} />

                <Grid templateColumns='repeat(4, 1fr)' gap={1}>
                  <GridItem colSpan={2} dir={'rtl'}>
                    <Text as={'b'}>مجموع</Text>
                  </GridItem>

                  <GridItem colSpan={2} dir={'ltr'}>
                    <Flex>
                      <Text>تومان</Text>
                      <Text mx={2}>
                        {parseInt((cart.totalPrice?.toString()).replace(/,/g, '')).toLocaleString()}
                      </Text>
                    </Flex>
                  </GridItem>
                </Grid>

                <Button size={'sm'} mt={3} w={'100%'} backgroundColor={'green.500'} onClick={createOrder}
                        _hover={{ backgroundColor: 'green.600' }} color={'white'}>
                  <Text>ثبت و پرداخت</Text>
                </Button>
              </>
            }
          </Box>
        </GridItem>

        <GridItem borderRadius={'30px'} colSpan={5} className={'box_shadow'} dir={'ltr'} pb={5} overflowY={'auto'}>
          <Box dir={'rtl'}>
            <Box boxShadow={'md'} zIndex={3} backgroundColor={'white'} pt={5} px={8} position={'sticky'} top={0} pb={1}>
              <Text as={'b'} fontSize={'20px'}>لیست سفارشات شما</Text>
            </Box>

            <Box zIndex={2} px={8}>
              {!cart.totalPrice &&
                <Box mt={3} mx={1}>
                  <Text as={'b'} fontSize={'16px'}>هنوز محصولی انتخاب نکرده اید🙃</Text>
                </Box>
              }
              <GetCart />
            </Box>
          </Box>
        </GridItem>
      </Grid>
    </>
  );
};
