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
} from '@chakra-ui/react';
import shoppingCartLinearIcon from '../assets/icons/Shop/vuesax/linear/shopping-cart.svg';
import userIcon from '../assets/icons/Users/vuesax/linear/user.svg';
import menuIcon from '../assets/icons/Essetional/vuesax/linear/menu.svg';
import loginIcon from '../assets/icons/Arrow/vuesax/linear/login.svg';
import { useNavigate } from 'react-router-dom';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

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
        <PopoverContent w={'200px'}>
          <PopoverBody dir={'rtl'}>
            <HStack cursor={'pointer'}
                    _hover={{ backgroundColor: 'gray.200', borderRadius: 5 }} py={2} px={3}>
              <Image src={loginIcon} />
              <Text cursor={'default'}>ورود</Text>
            </HStack>
            <HStack cursor={'pointer'} onClick={() => navigate('/register')}
                    _hover={{ backgroundColor: 'gray.200', borderRadius: 5 }} py={2} px={3}>
              <Image src={loginIcon} />
              <Text>ثبت نام</Text>
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
              <ColorModeSwitcher />
            </HStack>
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
