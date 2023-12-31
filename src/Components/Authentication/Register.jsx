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
import {motion} from 'framer-motion';
import {useEffect, useRef, useState} from 'react';
import {Blue7} from '../../Base/BaseAttributes';
import {fetchWithAxios, showToast} from '../../Base/BaseFunctions';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {
  setCode,
  setConfirmPassword,
  setEmail,
  setPassword,
  setPhoneNumber,
  setUsername,
} from '../../store/features/registerSlice';
import {setTimer, setTimeStart} from '../../store/features/timerSlice';

export const Register = () => {
  const codeLength = 5;
  const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
  const [showOverlay, setShowOverlay] = useState(false);
  const [showOverlayText, setShowOverlayText] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const [isRegisterButtonFormLoading, setIsRegisterButtonFormLoading] = useState(false);
  const [isSentRegisteredForm, setIsSentRegisteredForm] = useState(false);
  const [isCheckCodeFormLoading, setIsCheckCodeFormLoading] = useState(false);
  const [isSentCodeForm, setIsSentCodeForm] = useState(false);
  const labelWidth = '160px';
  const labelFontSize = '20px';
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const register = useSelector(state => state.register);
  const Ref = useRef(null);
  const timerSlice = useSelector(state => state.timerSlice);

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return {total, minutes, seconds};
  }

  const startTimer = (e) => {
    let {total, minutes, seconds} = getTimeRemaining(e);
    if (total >= 0) {
      dispatch(setTimer((minutes > 9 ? minutes : '0' + minutes) + ':' + (seconds > 9 ? seconds : '0' + seconds)));
    }
  }

  const clearTimer = (e) => {
    console.log(e)
    dispatch(setTimer('02:00'));

    if (Ref.current) clearInterval(Ref.current);
    Ref.current = setInterval(() => {
      startTimer(e);
    }, 1000);
  }

  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 120);
    return deadline;
  }

  const onClickReset = () => {
    dispatch(setTimeStart(true));
    clearTimer(getDeadTime());
  }

  useEffect(() => {
    if (timerSlice.timer === '00:00') {
      dispatch(setTimeStart(false));
    }
  }, [timerSlice.timer]);

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
    const {clientX, clientY} = event;
    setMousePosition({x: clientX, y: clientY});
  };

  useEffect(() => {
    if (isSentCodeForm) {
      showToast('تبریک!', 'ثبت نام شدید', 0);

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  }, [isSentCodeForm]);

  const setCodeMethod = (event, indexToSet) => {
    let tempArr = [...register.code];
    for (let i = 0; i < codeLength; i++) {
      tempArr[indexToSet] = event.nativeEvent.target.value;
    }
    dispatch(setCode(tempArr));
  };

  const getCode = () => {
    let codeTemp = '';
    for (let i = 0; i < register.code.length; i++) {
      codeTemp += register.code[i];
    }
    return codeTemp;
  };

  const sendCheckCode = () => {
    setIsCheckCodeFormLoading(true);

    fetchWithAxios.post('/verify_code/', {
      'username': register.username,
      'code': getCode(),
    })
      .then(function () {
          setIsSentCodeForm(true);
          setIsCheckCodeFormLoading(false);
        },
      ).catch((e) => {
      showToast('خطا', e.message);
      setIsCheckCodeFormLoading(false);
    });
  };

  const sendRegisterInfo = () => {
    if (register.username === '' || register.phoneNumber === '' || register.email === '' || register.password === '' || register.confirmPassword === '') {
      showToast('خطا', 'تمام مواردی که با علامت ستاره مشخص شده اند باید تکمیل شوند');
    } else {
      setIsRegisterButtonFormLoading(true);

      fetchWithAxios.post('/register/', {
        'username': register.username,
        'password': register.password,
        'confirm_password': register.confirmPassword,
        'email': register.email,
        'phone_number': register.phoneNumber,
      })
        .then(function () {
            setIsSentRegisteredForm(true);
            setIsRegisterButtonFormLoading(false);
            onClickReset();
          },
        ).catch((e) => {
        showToast('خطا', e.message);
        setIsRegisterButtonFormLoading(false);
      });
    }
  };

  return (
    <Box position='relative' width={'100%'} onMouseMove={handleMouseMove} mt={'-60px'}>
      <Image src={RegisterBackgroundImage} alt='Background' w={'100%'} h={'100%'} objectFit={'cover'}/>

      <motion.div
        style={{position: 'absolute', top: '40%', left: '1%', transform: 'translate(-50%, -50%)', zIndex: 1}}
        animate={{
          x: showOverlay ? (mousePosition.x - window.innerWidth / 2) / 100 : '-30px',
          y: (mousePosition.y - window.innerHeight / 2) / 50,
          opacity: showOverlay ? 1 : 0,
        }}
      >
        <Image opacity={showOverlay ? 1 : 0} src={RegisterCardBackgroundImage} alt='Overlay' objectFit={'cover'}/>
      </motion.div>

      <motion.div
        style={{position: 'absolute', top: '5%', left: '27%', transform: 'translate(-50%, -50%)', zIndex: 1}}
        animate={{
          x: -((mousePosition.x - window.innerWidth / 2) / 100), // Adjust the divisor for the desired movement speed
          y: -((mousePosition.y - window.innerHeight / 2) / 100),
        }}
      >
        <Image src={RegisterTicketBackgroundImage} alt='Overlay' objectFit={'cover'}/>
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
            <Text fontSize={'45px'} as={'b'}>ثبت نام</Text>
          </Flex>
          <FormControl my={3} isRequired>
            <Flex dir={'rtl'}>
              <FormLabel w={labelWidth} my={'auto'}>
                <Text fontSize={labelFontSize} as={'b'}>
                  نام کاربری:
                </Text>
              </FormLabel>
              <Input h={'57px'} backgroundColor={Blue7} dir={'ltr'} type='text' placeholder={'نام کاربری'}
                     disabled={isRegisterButtonFormLoading} autoFocus={!isSentRegisteredForm}
                     onChange={(event) => dispatch(setUsername(event.target.value))}/>
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
                     onChange={(event) => dispatch(setPhoneNumber(event.target.value))}/>
            </Flex>
          </FormControl>

          <FormControl my={3} isRequired>
            <Flex dir={'rtl'}>
              <FormLabel w={labelWidth} my={'auto'}><Text fontSize={labelFontSize} as={'b'}>ایمیل:</Text></FormLabel>
              <Input h={'57px'} backgroundColor={Blue7} dir={'ltr'} type='email' placeholder={'ایمیل'}
                     disabled={isRegisterButtonFormLoading}
                     onChange={(event) => dispatch(setEmail(event.target.value))}/>
            </Flex>
          </FormControl>

          <FormControl my={3} isRequired>
            <Flex dir={'rtl'}>
              <FormLabel w={labelWidth} my={'auto'}><Text fontSize={labelFontSize} as={'b'}>رمز عبور:</Text></FormLabel>
              <InputGroup>
                <Input h={'57px'} backgroundColor={Blue7} dir={'ltr'} type={showPassword ? 'text' : 'password'}
                       disabled={isRegisterButtonFormLoading}
                       placeholder='رمز عبور' onChange={(event) => dispatch(setPassword(event.target.value))}/>
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
                       onChange={(event) => dispatch(setConfirmPassword(event.target.value))}/>
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
          whileHover={{scale: 1.05}}
          whileTap={{scale: 0.95}}
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
          }}
        >
          <Button textColor={'white'} isLoading={isRegisterButtonFormLoading}
                  loadingText='اندکی صبر کنید'
                  backgroundColor={'#1C3347'}
                  _hover={{backgroundColor: '#1C3347'}}
                  onClick={sendRegisterInfo}>
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
                  {Array.from({length: codeLength}).map((value, indexOfArray) => (
                      <PinInputField key={indexOfArray} value={register.code[indexOfArray]} className={'box_shadow'}
                                     onChange={(event) => setCodeMethod(event, indexOfArray)}/>
                    ),
                  )}
                </PinInput>
              </HStack>
            </Flex>
          </FormControl>
          <Text>
            {timerSlice.timer}
          </Text>
        </Box>

        <motion.div
          whileHover={{scale: 1.05}}
          whileTap={{scale: 0.95}}
          style={{position: 'absolute', top: '100%', left: 0, zIndex: 1}}
        >
          <Button textColor={'white'} isLoading={isCheckCodeFormLoading}
                  loadingText='اندکی صبر کنید'
                  backgroundColor={'#1C3347'}
                  _hover={{backgroundColor: '#1C3347'}}
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
