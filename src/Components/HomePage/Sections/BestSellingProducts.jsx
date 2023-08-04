import { Box, Button, Center, Flex, Tag, Text } from '@chakra-ui/react';
import { useState } from 'react';
import Carousel from 'react-multi-carousel';
import { motion } from 'framer-motion';
import 'react-multi-carousel/lib/styles.css';
import { Image } from '@chakra-ui/react';

export const BestSellingProducts = () => {
  // eslint-disable-next-line no-unused-vars
  const [elements, setElements] = useState([
    {
      'title': '',
      'image': '',
    }, {
      'title': '',
      'image': '',
    }, {
      'title': '',
      'image': '',
    }, {
      'title': '',
      'image': '',
    }, {
      'title': '',
      'image': '',
    }, {
      'title': '',
      'image': '',
    },
  ]);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 7,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 5,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
    },
  };
  return (
    <>
      <Box>
        <Box>
          <Flex justify={'flex-end'} px={7}>
            <Tag py={5} px={8} my={8} borderRadius={'50px'} backgroundColor={'#8FA5D1'}>
              <Center>
                <Text cursor={'default'} dir={'rtl'} fontSize={'25px'} textColor={'black'} as={'b'}>
                  محصولات پر فروش
                </Text>
              </Center>
            </Tag>
          </Flex>
        </Box>
        {/*color={'#1C3347'}*/}
        <Carousel responsive={responsive}>
          {elements.map((value) => (
            <Center>
              <Box position={'relative'} h={'400px'} w={'200px'} borderTopLeftRadius={'30px'}
                   borderTopRightRadius={'30px'} backgroundColor={'#8FA5D1'}>

                <Center>
                  <Image boxSize='' src='' alt='' />
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ position: 'absolute', bottom: '5%', zIndex: 1 }}
                  >
                    <Button backgroundColor={'#1C3347'}>
                      <Text color={'white'}>افزودن به سبد خرید</Text>
                    </Button>
                  </motion.div>
                </Center>
              </Box>
            </Center>
          ))}
        </Carousel>;
      </Box>
    </>
  );
};



