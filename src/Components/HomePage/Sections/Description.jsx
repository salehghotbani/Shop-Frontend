import { Box, Button, ButtonGroup, Heading, Image, Text } from '@chakra-ui/react';
import IntroduceBackgroundImage from '../../../assets/images/home page/Introduce.png';
import IntroduceCardImage from '../../../assets/images/home page/IntroduceCard.png';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const Description = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showOverlay, setShowOverlay] = useState(false);
  const home = useSelector(state => state.home);
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger the overlay animation after 500ms (you can adjust this timing as needed)
    const timer = setTimeout(() => {
      setShowOverlay(true);
    }, 300);

    return () => {
      clearTimeout(timer);
    }; // Clear the timer to avoid memory leaks
  }, []);

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    setMousePosition({ x: clientX, y: clientY });
  };

  return (
    <>
      <Box position='relative' width={'100%'} onMouseMove={handleMouseMove}>
        <Image src={IntroduceBackgroundImage} alt='Background' w={'100%'} h={'100%'} objectFit={'cover'} />

        <motion.div
          style={{ position: 'absolute', top: '15%', left: '7%', transform: 'translate(-50%, -50%)', zIndex: 1 }}
          animate={{
            x: showOverlay ? (mousePosition.x - window.innerWidth / 2) / 50 : 0,
            y: (mousePosition.y - window.innerHeight / 2) / 50,
            opacity: showOverlay ? 1 : 0,
          }}
        >
          <Image opacity={showOverlay ? 1 : 0} src={IntroduceCardImage} alt='Overlay' objectFit={'cover'} />
        </motion.div>

        <motion.div
          style={{ position: 'absolute', top: '40%', left: '67%', transform: 'translate(-50%, -50%)', zIndex: 1 }}
          animate={{ opacity: showOverlay ? 1 : 0 }}
        >
          <Box textAlign={'justify'} dir={'rtl'} w={'900px'}>
            <Heading mb={5} cursor={'default'} opacity={showOverlay ? 1 : 0} dir={'rtl'} fontSize={'40px'} as={'h2'}>
              {home.middleTitle}
            </Heading>
            <Text cursor={'default'} opacity={showOverlay ? 1 : 0} fontSize={'20px'} as={'b'}>
              {home.middleDescription}
            </Text>
          </Box>

          <ButtonGroup mt={5}>
            <Button w={'110px'} h={'50px'} backgroundColor={'#8FA5D1'}
                    onClick={() => navigate('/login')}>
              <Text opacity={showOverlay ? 1 : 0}>
                ورود
              </Text>
            </Button>

            <Button w={'110px'} h={'50px'} backgroundColor={'#1C3347'}
                    onClick={() => navigate('/register')}>
              <Text color={'white'} opacity={showOverlay ? 1 : 0}>
                ثبت نام
              </Text>
            </Button>
          </ButtonGroup>
        </motion.div>
      </Box>
    </>
  );
};
