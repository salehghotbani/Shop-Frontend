import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import RegisterBackgroundImage from '../../assets/images/home page/Login.png';
import RegisterCardBackgroundImage from '../../assets/images/home page/LoginCard.png';
import RegisterTicketBackgroundImage from '../../assets/images/home page/LoginTicket.png';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Blue7 } from '../../BaseFunctions';

export const Register = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showOverlay, setShowOverlay] = useState(false);
  const [showOverlayText, setShowOverlayText] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const labelWidth = '150px';
  const labelFontSize = '20px';

  useEffect(() => {
    // Trigger the overlay animation after 500ms (you can adjust this timing as needed)
    const timer1 = setTimeout(() => {
      setShowOverlay(true);
    }, 200);

    const timer2 = setTimeout(() => {
      setShowOverlayText(true);
    }, 300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    }; // Clear the timer to avoid memory leaks
  }, []);

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    setMousePosition({ x: clientX, y: clientY });
  };

  return (
    <Box position='relative' width={'100%'} onMouseMove={handleMouseMove} mt={'-60px'}>
      <Image src={RegisterBackgroundImage} alt='Background' w={'100%'} h={'100%'} objectFit={'cover'} />

      <motion.div
        style={{ position: 'absolute', top: '40%', left: '1%', transform: 'translate(-50%, -50%)', zIndex: 1 }}
        animate={{
          x: showOverlay ? (mousePosition.x - window.innerWidth / 2) / 100 : '-30px', // Adjust the divisor for the desired movement speed
          y: (mousePosition.y - window.innerHeight / 2) / 50, // Adjust the divisor for the desired movement speed
          opacity: showOverlay ? 1 : 0,
        }}
      >
        <Image opacity={showOverlay ? 1 : 0} src={RegisterCardBackgroundImage} alt='Overlay' objectFit={'cover'} />
      </motion.div>

      <motion.div
        style={{ position: 'absolute', top: '5%', left: '27%', transform: 'translate(-50%, -50%)', zIndex: 1 }}
        animate={{
          x: -((mousePosition.x - window.innerWidth / 2) / 100), // Adjust the divisor for the desired movement speed
          y: -((mousePosition.y - window.innerHeight / 2) / 100),
        }}
      >
        <Image src={RegisterTicketBackgroundImage} alt='Overlay' objectFit={'cover'} />
      </motion.div>

      <motion.div
        style={{ position: 'absolute', top: '45%', left: '70%', transform: 'translate(-50%, -50%)', zIndex: 1 }}
        animate={{ opacity: showOverlayText ? 1 : 0 }}
      >
        <Box w={'700px'}>
          <Flex dir={'rtl'}>
          <Text fontSize={'45px'} as={'b'}>ثبت نام</Text>
          </Flex>
          <FormControl my={3}>
            <Flex dir={'rtl'}>
              <FormLabel w={labelWidth} my={'auto'}><Text fontSize={labelFontSize} as={'b'}>نام
                کاربری:</Text></FormLabel>
              <Input h={'57px'} backgroundColor={Blue7} dir={'ltr'} type='text' placeholder={'نام کاربری'} />
            </Flex>
          </FormControl>

          <FormControl my={3}>
            <Flex dir={'rtl'}>
              <FormLabel w={labelWidth} my={'auto'}><Text fontSize={labelFontSize} as={'b'}>شماره
                تماس:</Text></FormLabel>
              <Input h={'57px'} backgroundColor={Blue7} dir={'ltr'} type='text' placeholder={'نام کاربری'} />
            </Flex>
          </FormControl>

          <FormControl my={3}>
            <Flex dir={'rtl'}>
              <FormLabel w={labelWidth} my={'auto'}><Text fontSize={labelFontSize} as={'b'}>ایمیل:</Text></FormLabel>
              <Input h={'57px'} backgroundColor={Blue7} dir={'ltr'} type='email' placeholder={'ایمیل'} />
            </Flex>
          </FormControl>

          <FormControl my={3}>
            <Flex dir={'rtl'}>
              <FormLabel w={labelWidth} my={'auto'}><Text fontSize={labelFontSize} as={'b'}>رمز عبور:</Text></FormLabel>
              <InputGroup>
                <Input h={'57px'} backgroundColor={Blue7} dir={'ltr'} type={showPassword ? 'text' : 'password'}
                       placeholder='رمز عبور' />
                <InputRightElement width='4.5rem' mx={2}>
                  <Button mt={4} h='1.75rem' size='sm' onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? 'پنهان کن' : 'نمایش بده'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Flex>
          </FormControl>

          <FormControl my={3}>
            <Flex dir={'rtl'}>
              <FormLabel w={labelWidth} my={'auto'}><Text fontSize={labelFontSize} as={'b'}>تایید رمز
                عبور:</Text></FormLabel>
              <InputGroup>
                <Input h={'57px'} backgroundColor={Blue7} dir={'ltr'}
                       type={showPasswordConfirmation ? 'text' : 'password'} placeholder='تایید رمز عبور' />
                <InputRightElement width='4.5rem' mx={2}>
                  <Button mt={4} h='1.75rem' size='sm'
                          onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}>
                    {showPasswordConfirmation ? 'پنهان کن' : 'نمایش بده'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Flex>
          </FormControl>
        </Box>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{ position: 'absolute', top: '65%', left: '51.8%', zIndex: 1 }}
        animate={{ opacity: showOverlayText ? 1 : 0 }}
      >
        <Button w={'110px'} backgroundColor={'#1C3347'} _hover={{ backgroundColor: '#1C3347' }}>
          <Text textColor={'white'} opacity={showOverlayText ? 1 : 0}>
            خرید
          </Text>
        </Button>
      </motion.div>
    </Box>
  );
};
