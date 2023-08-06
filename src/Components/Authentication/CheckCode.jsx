import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Image,
  PinInput,
  PinInputField,
  Text,
} from '@chakra-ui/react';
import RegisterBackgroundImage from '../../assets/images/home page/Login.png';
import RegisterCardBackgroundImage from '../../assets/images/home page/LoginCard.png';
import RegisterTicketBackgroundImage from '../../assets/images/home page/LoginTicket.png';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { fetchWithAxios, showToast } from '../../BaseFunctions';
import { useNavigate } from 'react-router-dom';

export const CheckCode = () => {
  const codeLength = 5;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showOverlay, setShowOverlay] = useState(false);
  const [showOverlayText, setShowOverlayText] = useState(false);
  const [isCheckCodeFormLoading, setIsCheckCodeFormLoading] = useState(false);
  const [isSentCodeForm, setIsSentCodeForm] = useState(false);

  const [code, setCode] = useState([Array(codeLength).map(() => ('0'))]);
  const navigate = useNavigate();

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

  useEffect(() => {
    if (isSentCodeForm) {
      navigate('/', { replace: true });
    }
  }, [isSentCodeForm]);

  const setCodeMethod = (event, indexToSet) => {
    let tempArr = code;
    for (let i = 0; i < codeLength; i++) {
      tempArr[indexToSet] = event.nativeEvent.target.value;
    }
    setCode(tempArr);
  };

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    setMousePosition({ x: clientX, y: clientY });
  };

  const getCode = () => {
    let codeTemp = '';
    console.log(code);
    for (let i = 0; i < code.length; i++) {
      codeTemp += code[i];
    }
    return codeTemp;
  };

  const sendCheckCode = () => {
    setIsCheckCodeFormLoading(true);

    fetchWithAxios.post('/verify_code/', {
      'username': '',
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
          top: '35%',
          left: '70%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1,
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
                      <PinInputField key={indexOfArray} value={code[indexOfArray]} className={'box_shadow'}
                                     onChange={(event) => {
                                       console.log(event.nativeEvent.target.value);
                                       setCodeMethod(event, indexOfArray);
                                     }} />
                    ),
                  )}
                </PinInput>
              </HStack>
            </Flex>
          </FormControl>
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
