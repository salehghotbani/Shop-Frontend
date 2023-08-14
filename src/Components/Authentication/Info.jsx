import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  PinInput,
  PinInputField,
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
import {
  setCode,
  setConfirmPassword,
  setEmail,
  setFirstName,
  setLastName,
  setPassword,
  setPhoneNumber,
  setUsername,
} from '../../store/features/infoSlice';

export const Info = () => {
  const codeLength = 5;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showOverlay, setShowOverlay] = useState(false);
  const [showOverlayText, setShowOverlayText] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const [isRegisterButtonFormLoading, setIsRegisterButtonFormLoading] = useState(false);
  const [isSentRegisteredForm, setIsSentRegisteredForm] = useState(false);
  const [isCheckCodeFormLoading, setIsCheckCodeFormLoading] = useState(false);
  const [isSentCodeForm, setIsSentCodeForm] = useState(false);
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(0);
  const labelWidth = '160px';
  const labelFontSize = '17px';
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const info = useSelector(state => state.info);

  useEffect(() => {
    let timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        if (minutes === 0) {
          clearInterval(timer);
          // Timer has reached 0:00
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [minutes, seconds]);

  useEffect(() => {
    dispatch(setCode([Array.from({ length: codeLength }).map(() => ('0'))]));
  }, []);

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

  useEffect(() => {
    if (isSentCodeForm) {
      showToast('انجام شد!', 'اطلاعات شما با موفقیت تغییر یافت', 0);

      setTimeout(() => {
        navigate('/', { replace: true });
      }, 2000);
    }
  }, [isSentCodeForm]);

  const setCodeMethod = (event, indexToSet) => {
    let tempArr = [...info.code];
    for (let i = 0; i < codeLength; i++) {
      console.log(event.nativeEvent.target.value);
      tempArr[indexToSet] = event.nativeEvent.target.value;
    }
    dispatch(setCode(tempArr));
  };

  const getCode = () => {
    let codeTemp = '';
    for (let i = 0; i < info.code.length; i++) {
      codeTemp += info.code[i];
    }
    return codeTemp;
  };

  const sendCheckCode = () => {
    setIsCheckCodeFormLoading(true);

    fetchWithAxios.post('/verify_code/', {
      'username': info.username,
      'code': getCode(),
    })
      .then(function() {
          setIsSentCodeForm(true);
          setIsCheckCodeFormLoading(false);
        },
      ).catch((e) => {
      showToast('خطا', e.message);
      setIsCheckCodeFormLoading(false);
    });
  };

  const sendEditedInfo = () => {
    if (info.username === '' || info.phoneNumber === '' || info.email === '' || info.password === '' || info.confirmPassword === '') {
      showToast('خطا', 'تمام مواردی که با علامت ستاره مشخص شده اند باید تکمیل شوند');
    } else {
      setIsRegisterButtonFormLoading(true);

      fetchWithAxios.post('/info/', {
        'username': info.username,
        'password': info.password,
        'confirm_password': info.confirmPassword,
        'email': info.email,
        'phone_number': info.phoneNumber,
      })
        .then(function() {
            setIsSentRegisteredForm(true);
            setIsRegisterButtonFormLoading(false);
          },
        ).catch((e) => {
        showToast('خطا', e.message);
        setIsRegisterButtonFormLoading(false);
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
          zIndex: isSentRegisteredForm ? -1 : 1,
          opacity: isSentRegisteredForm ? 0 : 1,
        }}
      >
        <Box w={'700px'}>
          <Flex dir={'rtl'}>
            <Text fontSize={'45px'} as={'b'}>اطلاعات خود را ویرایش کنید:</Text>
          </Flex>

          <FormControl my={3} isRequired>
            <Flex dir={'rtl'}>
              <FormLabel w={labelWidth} my={'auto'}>
                <Text fontSize={labelFontSize} as={'b'}>
                  نام:
                </Text>
              </FormLabel>
              <Input h={'57px'} backgroundColor={Blue7} dir={'ltr'} type='text' placeholder={'نام'}
                     disabled={isRegisterButtonFormLoading} autoFocus={!isSentRegisteredForm}
                     onChange={(event) => dispatch(setFirstName(event.target.value))} />
            </Flex>
          </FormControl>

          <FormControl my={3} isRequired>
            <Flex dir={'rtl'}>
              <FormLabel w={labelWidth} my={'auto'} >
                <Text fontSize={labelFontSize} as={'b'}>
                  نام خانوادگی:
                </Text>
              </FormLabel>
              <Input h={'57px'} backgroundColor={Blue7} dir={'ltr'} type='text' placeholder={'نام خانوادگی'}
                     disabled={isRegisterButtonFormLoading} autoFocus={!isSentRegisteredForm}
                     onChange={(event) => dispatch(setLastName(event.target.value))} />
            </Flex>
          </FormControl>

          <FormControl my={3} isRequired>
            <Flex dir={'rtl'}>
              <FormLabel w={labelWidth} my={'auto'}>
                <Text fontSize={labelFontSize} as={'b'}>
                  نام کاربری:
                </Text>
              </FormLabel>
              <Input h={'57px'} backgroundColor={Blue7} dir={'ltr'} type='text' placeholder={'نام کاربری'}
                     disabled={isRegisterButtonFormLoading} autoFocus={!isSentRegisteredForm}
                     onChange={(event) => dispatch(setUsername(event.target.value))} />
            </Flex>
          </FormControl>

          <FormControl my={3} isRequired>
            <Flex dir={'rtl'}>
              <FormLabel w={labelWidth} my={'auto'}>
                <Text fontSize={labelFontSize} as={'b'}>
                  شماره تماس:
                </Text>
              </FormLabel>
              <Input h={'57px'} backgroundColor={Blue7} dir={'ltr'} type='text' placeholder={'شماره تماس'}
                     disabled={isRegisterButtonFormLoading}
                     onChange={(event) => dispatch(setPhoneNumber(event.target.value))} />
            </Flex>
          </FormControl>

          <FormControl my={3} isRequired>
            <Flex dir={'rtl'}>
              <FormLabel w={labelWidth} my={'auto'}><Text fontSize={labelFontSize} as={'b'}>ایمیل:</Text></FormLabel>
              <Input h={'57px'} backgroundColor={Blue7} dir={'ltr'} type='email' placeholder={'ایمیل'}
                     disabled={isRegisterButtonFormLoading}
                     onChange={(event) => dispatch(setEmail(event.target.value))} />
            </Flex>
          </FormControl>

          <FormControl my={3} isRequired>
            <Flex dir={'rtl'}>
              <FormLabel w={labelWidth} my={'auto'}><Text fontSize={labelFontSize} as={'b'}>رمز عبور:</Text></FormLabel>
              <InputGroup>
                <Input h={'57px'} backgroundColor={Blue7} dir={'ltr'} type={showPassword ? 'text' : 'password'}
                       disabled={isRegisterButtonFormLoading}
                       placeholder='رمز عبور' onChange={(event) => dispatch(setPassword(event.target.value))} />
                <InputRightElement width='4.5rem' mx={2}>
                  <Button mt={4} h='1.75rem' size='sm' onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? 'پنهان کن' : 'نمایش بده'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Flex>
          </FormControl>

          <FormControl my={3} isRequired>
            <Flex dir={'rtl'}>
              <FormLabel w={labelWidth} my={'auto'}>
                <Text fontSize={labelFontSize} as={'b'}>
                  تایید رمز عبور:
                </Text>
              </FormLabel>
              <InputGroup>
                <Input h={'57px'} backgroundColor={Blue7} dir={'ltr'} disabled={isRegisterButtonFormLoading}
                       type={showPasswordConfirmation ? 'text' : 'password'} placeholder='تایید رمز عبور'
                       onChange={(event) => dispatch(setConfirmPassword(event.target.value))} />
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

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
          }}
        >
          <Button textColor={'white'} isLoading={isRegisterButtonFormLoading}
                  loadingText='اندکی صبر کنید'
                  backgroundColor={'#1C3347'}
                  _hover={{ backgroundColor: '#1C3347' }}
                  onClick={sendEditedInfo}>
            <Text textColor={'white'} opacity={showOverlayText ? 1 : 0}>
              تایید و دریافت کد
            </Text>
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        style={{
          position: 'absolute',
          top: '35%',
          left: '70%',
          transform: 'translate(-50%, -50%)',
          zIndex: isSentRegisteredForm ? 1 : -1,
          opacity: isSentRegisteredForm ? 1 : 0,
        }}
      >
        <Box w={'600px'}>
          <Flex dir={'rtl'}>
            <Text fontSize={'45px'} as={'b'}>بررسی کد تایید</Text>
          </Flex>
          <Flex dir={'rtl'}>
            <Text fontSize={'18px'} as={'b'}>
              کد تاییدی به ایمیل شما ارسال شده است. لطفا آن را در بخش زیر وارد کنید:
            </Text>
          </Flex>
          <FormControl my={3}>
            <Flex dir={'rtl'}>
              <FormLabel w={'80px'} my={'auto'}>
                <Text fontSize={'20px'} as={'b'}>
                  کد تایید:
                </Text>
              </FormLabel>
              <HStack dir={'ltr'}>
                <PinInput>
                  {Array.from({ length: codeLength }).map((value, indexOfArray) => (
                      <PinInputField key={indexOfArray} value={info.code[indexOfArray]} className={'box_shadow'}
                                     onChange={(event) => setCodeMethod(event, indexOfArray)} />
                    ),
                  )}
                </PinInput>
              </HStack>
            </Flex>
          </FormControl>
          <Text>
            {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
          </Text>
        </Box>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ position: 'absolute', top: '100%', left: 0, zIndex: 1 }}
        >
          <Button textColor={'white'} isLoading={isCheckCodeFormLoading}
                  loadingText='اندکی صبر کنید'
                  backgroundColor={'#1C3347'}
                  _hover={{ backgroundColor: '#1C3347' }}
                  onClick={sendCheckCode}>
            <Text textColor={'white'} opacity={showOverlayText ? 1 : 0}>
              ثبت
            </Text>
          </Button>
        </motion.div>
      </motion.div>
    </Box>
  );
};
