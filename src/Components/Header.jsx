import {
  Box,
  Grid,
  GridItem,
  HStack,
  Image,
  Text,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Center,
  Button,
  Stack,
  useBoolean, PopoverArrow,
} from '@chakra-ui/react';
import shoppingCartLinearIcon from '../assets/icons/Shop/vuesax/linear/shopping-cart.svg';
import userIcon from '../assets/icons/Users/vuesax/linear/user.svg';
import userIconBold from '../assets/icons/Users/vuesax/bold/user.svg';
import menuIcon from '../assets/icons/Essetional/vuesax/linear/menu.svg';
import loginIcon from '../assets/icons/Arrow/vuesax/linear/login.svg';
import { useNavigate } from 'react-router-dom';
import logoPng from '../assets/images/Logo.png';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWithAxios, logout, showToast } from '../Base/BaseFunctions';
import { setCategory, setProductListFilter, setSelectedCategory } from '../store/features/productsSlice';
import { CART_DASHBOARD, PROFILE_DASHBOARD } from './Dashboard/DashboardSections';
import { GetCart } from './Dashboard/DashboardSections/Cart';

export const Header = () => {
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const product = useSelector(state => state.product);
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const [isOpenCardItemsPopover, setIsOpenCardItemsPopover] = useBoolean();

  const getCategory = () => {
    fetchWithAxios.get('/shop/category/', {})
      .then(function(response) {
          let tempArray = [];
          response.data.categories.map((value) => {
            tempArray.push({ id: value.id, title: value.title, image: value.image });
          });
          dispatch(setCategory(tempArray));
        },
      ).catch((e) => {
      showToast('خطا', e.message);
    });
  };

  useEffect(() => {
    getCategory();
  }, []);

  const UserIcon = () => {
    return (
      <Popover>
        <PopoverTrigger>
          <Box p={'6px'} backgroundColor={'white'} borderRadius={'100%'} cursor={'pointer'} w={'40px'} h={'40px'}>
            <Center><Image src={userIcon} w={'28px'} h={'28px'} /></Center>
          </Box>
        </PopoverTrigger>
        <PopoverContent w={'220px'}>
          <PopoverBody dir={'rtl'}>
            {user.isRegistered ?
              <>
                <HStack dir={'ltr'} cursor={'pointer'} _hover={{ backgroundColor: 'gray.200', borderRadius: 5 }} py={2}
                        px={3}
                        onClick={() => {
                          if (user.isRegistered) {
                            navigate(`/info?dashboard_section=${PROFILE_DASHBOARD}`);
                            window.location.reload();
                          }
                        }}>
                  <Image src={userIconBold} />
                  <Text mb={'-4px'}>
                    {user.username.length > 12 ?
                      user.username.substring(0, 12) + '...'
                      :
                      user.username
                    }
                  </Text>
                </HStack>
                <HStack cursor={'pointer'} onClick={() => logout(navigate)}
                        _hover={{ backgroundColor: 'gray.200', borderRadius: 5 }} py={2} px={3}>
                  <Image src={loginIcon} />
                  <Text>خروج</Text>
                </HStack>
              </>
              :
              <>
                <HStack cursor={'pointer'} onClick={() => navigate('/login')}
                        _hover={{ backgroundColor: 'gray.200', borderRadius: 5 }} py={2} px={3}>
                  <Image src={loginIcon} />
                  <Text>ورود</Text>
                </HStack>
                <HStack cursor={'pointer'} onClick={() => navigate('/register')}
                        _hover={{ backgroundColor: 'gray.200', borderRadius: 5 }} py={2} px={3}>
                  <Image src={loginIcon} />
                  <Text>ثبت نام</Text>
                </HStack>
              </>
            }
          </PopoverBody>
        </PopoverContent>
      </Popover>
    );
  };

  return (
    <>
      <Box zIndex={'9999 !important'} position={'sticky'} top={0} px={7} py={3} backgroundColor={'#1D3347'}
           className={'box_shadow'}>
        <Grid templateColumns='repeat(5, 1fr)' gap={4}>
          <GridItem colStart={0} colEnd={2}>
            <HStack spacing={3}>
              <Popover isOpen={isOpenCardItemsPopover} onClose={setIsOpenCardItemsPopover.on} placement='bottom'>
                <PopoverTrigger>
                  <Box p={'6px'} backgroundColor={'white'} borderRadius={'100%'} position={'relative'} w={'40px'}
                       h={'40px'} cursor={user.isRegistered ? 'pointer' : 'default'}
                       onClick={() => {
                         if (user.isRegistered) {
                           navigate(`/info?dashboard_section=${CART_DASHBOARD}`);
                           window.location.reload();
                         }
                       }}
                       onMouseEnter={setIsOpenCardItemsPopover.on}
                       onMouseLeave={setIsOpenCardItemsPopover.off}>
                    {cart.products.length !== 0 &&
                      <Box position={'absolute'} backgroundColor={'green.600'} w={'22px'} h={'22px'}
                           borderRadius={'100%'}
                           bottom={-2} left={-1.5}>
                        <Center>
                          <Text
                            color={'white'}>{Number(cart.products.length) > 9 ? <>+9</> : cart.products.length}</Text>
                        </Center>
                      </Box>
                    }
                    <Center><Image src={shoppingCartLinearIcon} w={'28px'} /></Center>
                  </Box>
                </PopoverTrigger>
                {user.isRegistered &&
                  <PopoverContent w={'600px'} maxH={'340px'} dir={'ltr'} overflowY={'auto'}>
                    <PopoverBody dir={'rtl'} onMouseEnter={setIsOpenCardItemsPopover.on}
                                 onMouseLeave={setIsOpenCardItemsPopover.off}>
                      <PopoverArrow />
                      <GetCart />
                    </PopoverBody>
                  </PopoverContent>
                }
              </Popover>
              <UserIcon />
            </HStack>
          </GridItem>

          <GridItem colStart={3} colEnd={4}>
            <Center mt={1}>
              <HStack spacing={2} cursor={'pointer'}
                      onClick={() => {
                        navigate('/');
                      }}>
                <Text mt={1} fontSize={'17px'} as={'b'} color={'white'}>
                  فروشگاه
                </Text>
                <Image src={logoPng} w={'50px'} my={'-20px'} />
              </HStack>
            </Center>
          </GridItem>

          <GridItem colStart={6} colEnd={6}>
            {product.category.length &&
              <Popover>
                <PopoverTrigger>
                  <Button p={'6px'} backgroundColor={'white'} borderRadius={'100%'} cursor={'pointer'}>
                    <Image src={menuIcon} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent w={'200px'}>
                  <PopoverBody>
                    <Stack spacing={2} dir={'rtl'}>
                      {product.category.map((value) => (
                        <HStack cursor={'pointer'} _hover={{ backgroundColor: 'gray.200', borderRadius: 5 }} py={2}
                                px={3}
                                onClick={() => {
                                  dispatch(setSelectedCategory(value.id));
                                  dispatch(setProductListFilter({
                                    priceRange: [product.productListFilter.priceRange[0], product.productListFilter.priceRange[1]],
                                    brand: '',
                                  }));
                                  navigate(`/productList?category=${value.id}&page=${product.page}`);
                                }}>
                          <Image src={loginIcon} />
                          <Text>{value.title}</Text>
                        </HStack>
                      ))}
                    </Stack>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            }
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};
