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
  PopoverTrigger, Center,
} from '@chakra-ui/react';
import shoppingCartLinearIcon from '../assets/icons/Shop/vuesax/linear/shopping-cart.svg';
import userIcon from '../assets/icons/Users/vuesax/linear/user.svg';
import menuIcon from '../assets/icons/Essetional/vuesax/linear/menu.svg';
import loginIcon from '../assets/icons/Arrow/vuesax/linear/login.svg';
import { useNavigate } from 'react-router-dom';
import logoPng from '../assets/images/Logo.png';

export const Header = () => {
  const navigate = useNavigate();
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
            <HStack cursor={'pointer'} onClick={() => navigate('/register/checkcode')}
                    _hover={{ backgroundColor: 'gray.200', borderRadius: 5 }} py={2} px={3}>
              <Image src={loginIcon} />
              <Text>تایید حساب کاربری</Text>
            </HStack>

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
            <Center>
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
            <Box p={'6px'} backgroundColor={'white'} borderRadius={'100%'} cursor={'pointer'}>
              <Image src={menuIcon} />
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};
