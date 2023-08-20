import {
  Box, Button,
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
  NumberInputStepper, Stack,
  Text,
} from '@chakra-ui/react';
import { addToCart, backendURL, getProductsCart, removeFromCart } from '../../Base/BaseFunctions';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import standardLogo from '../../assets/images/standard.png';
import availabilityLogo from '../../assets/images/availability.png';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import componentIcon from '../../assets/icons/Design-Tools/vuesax/bold/component.svg';

export const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  useEffect(() => {
    getProductsCart(dispatch);
  }, []);

  return (
    <>
      <Grid h={'89vh'} templateColumns='repeat(7, 1fr)' gap={5} p={'30px'}>
        <GridItem colSpan={2} dir={'rtl'}>
          <Box p={5} borderRadius={8} className={'box_shadow'}>
            <Text as={'b'} fontSize={'18px'}>قیمت نهایی</Text>
            <Divider my={1} borderRadius={8} borderColor={'black'} />

            <Stack mt={2} spacing={1}>
              {cart.products.map((value, index) => (
                <>
                  <Grid templateColumns='repeat(4, 1fr)' gap={1}>
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
                </>
              ))}
            </Stack>

            <Divider my={1} borderRadius={8} borderColor={'black'} />

            <Grid templateColumns='repeat(4, 1fr)' gap={1}>
              <GridItem colSpan={2} dir={'rtl'}>
                <Text as={'b'}>مجموع</Text>
              </GridItem>

              <GridItem colSpan={2} dir={'ltr'}>
                <Flex>
                  <Text>تومان</Text>
                  <Text mx={2}>{parseInt((cart.totalPrice.toString()).replace(/,/g, '')).toLocaleString()}</Text>
                </Flex>
              </GridItem>
            </Grid>

            <Button size={'sm'} mt={3} w={'100%'} backgroundColor={'green.500'}
                    _hover={{ backgroundColor: 'green.600' }} color={'white'}>
              <Text>ثبت و پرداخت</Text>
            </Button>
          </Box>
        </GridItem>

        <GridItem borderRadius={'30px'} colSpan={5} className={'box_shadow'} dir={'ltr'} pb={5}
                  overflowY={'auto'}>
          <Box dir={'rtl'}>
            <Box boxShadow={'md'} zIndex={3} backgroundColor={'white'} pt={5} px={8} position={'sticky'} top={0} pb={1}>
              <Text as={'b'} fontSize={'20px'}>لیست سفارشات شما</Text>
              {/*<Divider my={1} borderRadius={8} borderColor={'black'} />*/}
            </Box>

            <Box zIndex={2} px={8}>
              {cart.products.map((value, index) => (
                <Box key={index} className={'box_shadow'} my={2} borderRadius={'20px'}>
                  <Grid templateColumns='repeat(4, 1fr)' gap={5} p={'30px'}>
                    <GridItem colSpan={1} dir={'rtl'}>
                      <Center borderRadius={'30px'} p={5}>
                        <Box backgroundImage={backendURL + '/' + value.avatar} w={'200px'} h={'200px'}
                             backgroundPosition={'center'} backgroundRepeat={'no-repeat'}
                             backgroundSize={'cover'} />
                      </Center>
                    </GridItem>

                    <GridItem colSpan={3} dir={'rtl'} borderRadius={'30px'}>
                      <Text as={'b'} fontSize={'17px'}>{value.name}</Text>
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
              ))}
            </Box>
          </Box>
        </GridItem>
      </Grid>
    </>
  );
};
