import { Box, Button, Heading, Image, Text } from '@chakra-ui/react';
import IntroduceBackgroundImage from '../../../assets/images/home page/Introduce.png';
import IntroduceCardImage from '../../../assets/images/home page/IntroduceCard.png';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const Description = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showOverlay, setShowOverlay] = useState(false);

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
      <Box position='relative' width={'100%'} onMouseMove={handleMouseMove} mt={'-60px'}>
        <Image src={IntroduceBackgroundImage} alt='Background' w={'100%'} h={'100%'} objectFit={'cover'} />

        <motion.div
          style={{ position: 'absolute', top: '15%', left: '7%', transform: 'translate(-50%, -50%)', zIndex: 1 }}
          animate={{
            x: showOverlay ? (mousePosition.x - window.innerWidth / 2) / 50 : 0, // Adjust the divisor for the desired movement speed
            y: (mousePosition.y - window.innerHeight / 2) / 50, // Adjust the divisor for the desired movement speed
            opacity: showOverlay ? 1 : 0,
          }}
        >
          <Image opacity={showOverlay ? 1 : 0} src={IntroduceCardImage} alt='Overlay' objectFit={'cover'} />
        </motion.div>


        <motion.div
          style={{ position: 'absolute', top: '7%', left: '80%', transform: 'translate(-50%, -50%)', zIndex: 1 }}
          animate={{ y: showOverlay ? 20 : 0, opacity: showOverlay ? '100%' : 0 }}
        >
          <Heading cursor={'default'} opacity={showOverlay ? '100%' : 0} dir={'rtl'} fontSize={'40px'} as={'h2'}>
            لورم ایپسوم
          </Heading>
        </motion.div>

        <motion.div
          style={{ position: 'absolute', top: '40%', left: '66.6%', transform: 'translate(-50%, -50%)', zIndex: 1 }}
          animate={{ opacity: showOverlay ? '100%' : 0 }}
        >
          <Box textAlign={'justify'} dir={'rtl'} w={'900px'}>
            <Text cursor={'default'} opacity={showOverlay ? '100%' : 0} fontSize={'20px'} as={'b'}>
              متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه
              روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با
              هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه
              و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و
              فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه
              راهکارها و شرایط سخت تایپ به پایان رسد
            </Text>
          </Box>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{ position: 'absolute', top: '66%', left: '76%', zIndex: 1 }}
          animate={{ opacity: showOverlay ? '100%' : 0 }}
        >
          <Button w={'110px'} h={'50px'} backgroundColor={'#8FA5D1'}>
            <Text opacity={showOverlay ? '100%' : 0}>
              ورود
            </Text>
          </Button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{ position: 'absolute', top: '66%', left: '83%', zIndex: 1 }}
          animate={{ opacity: showOverlay ? '100%' : 0 }}
        >
          <Button w={'110px'} h={'50px'} backgroundColor={'#1C3347'}>
            <Text color={'white'} opacity={showOverlay ? '100%' : 0}>
              ثبت نام
            </Text>
          </Button>
        </motion.div>
      </Box>
    </>
  );
};
