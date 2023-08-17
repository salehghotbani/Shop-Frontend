import { Box, Button, Center, Heading, Image, Text } from '@chakra-ui/react';
import heroBackgroundImage from '../../../assets/images/home page/HomeHero.png';
import heroPhoneBackgroundImage from '../../../assets/images/home page/HomeHeroPhone.png';
import heroLineBackgroundImage from '../../../assets/images/home page/HomeHeroLine.png';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showOverlay, setShowOverlay] = useState(false);
  const [showOverlayText, setShowOverlayText] = useState(false);
  const home = useSelector(state => state.home);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowOverlay(true);
    }, 200);

    const timer2 = setTimeout(() => {
      setShowOverlayText(true);
    }, 300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    setMousePosition({ x: clientX, y: clientY });
  };

  return (
    <Box position='relative' width={'100%'} onMouseMove={handleMouseMove} mt={'-60px'}>
      <Image src={heroBackgroundImage} alt='Background' w={'100%'} h={'100%'} objectFit={'cover'} />

      <motion.div
        style={{ position: 'absolute', top: '15%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}
        animate={{
          x: showOverlay ? (mousePosition.x - window.innerWidth / 2) / 50 : 0, // Adjust the divisor for the desired movement speed
          y: (mousePosition.y - window.innerHeight / 2) / 50, // Adjust the divisor for the desired movement speed
          opacity: showOverlay ? 1 : 0,
        }}
      >
        <Image opacity={showOverlay ? 1 : 0} src={heroPhoneBackgroundImage} alt='Overlay' objectFit={'cover'} />
      </motion.div>

      <motion.div
        style={{ position: 'absolute', top: '25%', left: '8%', transform: 'translate(-50%, -50%)', zIndex: 1 }}
        animate={{
          x: -((mousePosition.x - window.innerWidth / 2) / 100), // Adjust the divisor for the desired movement speed
          y: -((mousePosition.y - window.innerHeight / 2) / 100),
        }}
      >
        <Image src={heroLineBackgroundImage} alt='Overlay' objectFit={'cover'} />
      </motion.div>

      <motion.div
        style={{ position: 'absolute', top: '30%', left: '10%', zIndex: 1 }}
        animate={{ opacity: showOverlayText ? 1 : 0 }}
      >
        <Box dir={'rtl'} w={'700px'}>
          <Box textAlign={'justify'} mb={5}>
            <Heading mb={3} cursor={'default'} opacity={showOverlayText ? 1 : 0} dir={'rtl'} fontSize={'45px'}
                     as={'h2'}>
              {home.heroTitle}
            </Heading>

            <Text cursor={'default'} opacity={showOverlayText ? 1 : 0} fontSize={'25px'} as={'b'}>
              {home.heroDescription}
            </Text>
          </Box>

          <Center>
            <Button w={'110px'} h={'50px'} backgroundColor={'#8FA5D1'}>
              <Text opacity={showOverlayText ? 1 : 0}>
                خرید
              </Text>
            </Button>
          </Center>
        </Box>
      </motion.div>
    </Box>
  );
};
