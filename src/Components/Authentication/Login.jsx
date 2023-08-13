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
import { Blue7 } from '../../BaseAttributes';
import { fetchWithAxios, showToast } from '../../BaseFunctions';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUsername } from '../../store/features/loginSlice';
import { setPassword } from '../../store/features/loginSlice';
import { setRegistrationStatus } from '../../store/features/userSlice';

export const Login = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showOverlay, setShowOverlay] = useState(false);
  const [showOverlayText, setShowOverlayText] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoginButtonFormLoading, setIsLoginButtonFormLoading] = useState(false);

  const labelWidth = '160px';
  const labelFontSize = '20px';

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = useSelector(state => state.login);

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

  const sendLoginInfo = () => {
    if (login.username === '' || login.password === '') {
      showToast('خطا', 'تمام مواردی که با علامت ستاره مشخص شده‌اند باید تکمیل شوند');
    } else {
      setIsLoginButtonFormLoading(true);

      fetchWithAxios.post('/loging/', {
        'username': login.username,
        'password': login.password,
      })
        .then(function() {
            setIsLoginButtonFormLoading(false);
            showToast('تبریک!', 'وارد شدید', 0);
            dispatch(setRegistrationStatus(true));

            setTimeout(() => {
              navigate('/', { replace: true });
            }, 2000);
          },
        ).catch((e) => {
        showToast('خطا', e.message);
        setIsLoginButtonFormLoading(false);
      });
    }
  };

  return (
    <Box position='relative' width={'100%'} onMouseMove={handleMouseMove} mt={'-60px'}>
      <Image src={RegisterBackgroundImage} alt='Background' w={'100%'} h={'100%'} objectFit={'cover'} />

      <motion.div
        style={{ position: 'absolute', top: '40%', left: '1%', transform: 'translate(-50%, -50%)', zIndex: 1 }}
        animate={{
          x: showOverlay ? (mousePosition.x - window.innerWidth / 2) / 100 : '-30px',
          y: (mousePosition.y - window.innerHeight / 2) / 50,
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
        style={{
          position: 'absolute',
          top: '45%',
          left: '70%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1,
        }}
      >
        <Box w={'700px'}>
          <Flex dir={'rtl'}>
            <Text fontSize={'45px'} as={'b'}>وارد شوید</Text>
          </Flex>
          <FormControl my={3} isRequired>
            <Flex dir={'rtl'}>
              <FormLabel w={labelWidth} my={'auto'}>
                <Text fontSize={labelFontSize} as={'b'}>
                  نام کاربری:
                </Text>
              </FormLabel>
              <Input h={'57px'} backgroundColor={Blue7} dir={'ltr'} type='text' placeholder={'نام کاربری'}
                     disabled={isLoginButtonFormLoading}
                     onChange={(event) => dispatch(setUsername(event.target.value))} />
            </Flex>
          </FormControl>

          <FormControl my={3} isRequired>
            <Flex dir={'rtl'}>
              <FormLabel w={labelWidth} my={'auto'}><Text fontSize={labelFontSize} as={'b'}>رمز عبور:</Text></FormLabel>
              <InputGroup>
                <Input h={'57px'} backgroundColor={Blue7} dir={'ltr'} type={showPassword ? 'text' : 'password'}
                       disabled={isLoginButtonFormLoading}
                       placeholder='رمز عبور' onChange={(event) => dispatch(setPassword(event.target.value))} />
                <InputRightElement width='4.5rem' mx={2}>
                  <Button mt={4} h='1.75rem' size='sm' onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? 'پنهان کن' : 'نمایش بده'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Flex>
          </FormControl>
        </Box>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ position: 'absolute', top: '100%', left: 0, zIndex: 1 }}
        >
          <Button textColor={'white'} isLoading={isLoginButtonFormLoading}
                  loadingText='اندکی صبر کنید'
                  backgroundColor={'#1C3347'}
                  _hover={{ backgroundColor: '#1C3347' }}
                  onClick={sendLoginInfo}>
            <Text textColor={'white'} opacity={showOverlayText ? 1 : 0}>
              ورود
            </Text>
          </Button>
        </motion.div>
      </motion.div>
    </Box>
  );
};
