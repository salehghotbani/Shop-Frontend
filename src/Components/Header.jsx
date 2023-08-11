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
} from '@chakra-ui/react';
import shoppingCartLinearIcon from '../assets/icons/Shop/vuesax/linear/shopping-cart.svg';
import userIcon from '../assets/icons/Users/vuesax/linear/user.svg';
import menuIcon from '../assets/icons/Essetional/vuesax/linear/menu.svg';
import loginIcon from '../assets/icons/Arrow/vuesax/linear/login.svg';
import { useNavigate } from 'react-router-dom';
import logoPng from '../assets/images/Logo.png';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWithAxios, showToast } from '../BaseFunctions';
import { setCategory, setSelectedCategory } from '../store/features/productsSlice';

export const Header = () => {
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const product = useSelector(state => state.product);
  const dispatch = useDispatch();

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

  const logout = () => {
    fetchWithAxios.get('/logout/', {})
      .then(function() {
        navigate('/', { replace: true });
      })
      .catch((e) => {
        showToast('خطا', e.message);
      });
  };

  const UserIcon = () => {
    return (
      <Popover>
        <PopoverTrigger>
          <Box p={'6px'} backgroundColor={'white'} borderRadius={'100%'} cursor={'pointer'}>
            <Image src={userIcon} />
          </Box>
        </PopoverTrigger>
        <PopoverContent w={'220px'}>
          <PopoverBody dir={'rtl'}>
            {user.isRegistered ?
              <>
                <HStack dir={'ltr'} cursor={'default'} _hover={{ backgroundColor: 'gray.200', borderRadius: 5 }} py={2}
                        px={3}>
                  <Text mb={'-4px'}>
                    {user.username.length > 12 ?
                      user.username.substring(0, 12) + '...'
                      :
                      user.username
                    }
                  </Text>
                </HStack>
                <HStack cursor={'pointer'} onClick={() => navigate('/login')}
                        _hover={{ backgroundColor: 'gray.200', borderRadius: 5 }} py={2} px={3}>
                  <Image src={loginIcon} />
                  <Text>پنل کاربری</Text>
                </HStack>
                <HStack cursor={'pointer'} onClick={logout}
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
              <Box p={'6px'} backgroundColor={'white'} borderRadius={'100%'} cursor={'pointer'}>
                <Image src={shoppingCartLinearIcon} />
              </Box>
              <UserIcon />
            </HStack>
          </GridItem>

          <GridItem colStart={3} colEnd={4}>
            <Center mt={1}>
              <HStack spacing={2} cursor={'pointer'}
                      onClick={() => {
                        navigate('/', { replace: true });
                      }}>
                <Text mt={1} fontSize={'17px'} as={'b'} color={'white'}>
                  فروشگاه
                </Text>
                <Image src={logoPng} w={'50px'} my={'-20px'} />
              </HStack>
            </Center>
          </GridItem>

          <GridItem colStart={6} colEnd={6}>
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
                      <HStack cursor={'pointer'} _hover={{ backgroundColor: 'gray.200', borderRadius: 5 }} py={2} px={3}
                              onClick={() => {
                                dispatch(setSelectedCategory(value.id));
                                navigate(`/products?category=${value.id}&page=${product.page}`);
                              }}>
                        <Image src={loginIcon} />
                        <Text>{value.title}</Text>
                      </HStack>
                    ))}
                  </Stack>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};
