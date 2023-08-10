import { Box, Button, Center, Flex, Tag, Text } from '@chakra-ui/react';
import Carousel from 'react-multi-carousel';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

export const AmazingOffer = () => {
  const product = useSelector(state => state.product);

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
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <Box>
        {product.amazingProducts.length ?
          <>
            <Flex justify={'flex-end'} px={7}>
              <Tag py={5} px={8} my={8} borderRadius={'50px'} backgroundColor={'#1C3347'}>
                <Center>
                  <Text cursor={'default'} dir={'rtl'} fontSize={'25px'} textColor={'white'} as={'b'}>
                    پیشنهاد شگفت انگیز
                  </Text>
                </Center>
              </Tag>
            </Flex>

            <Carousel responsive={responsive}>
              {product.amazingProducts.map((value) => (
                <Center>
                  <Box position={'relative'} h={'400px'} w={'200px'} borderTopLeftRadius={'30px'}
                       borderTopRightRadius={'30px'} backgroundColor={'#1C3347'}>

                    <Center>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{ position: 'absolute', bottom: '5%', zIndex: 1 }}
                      >
                        <Button>
                          <Text>{value.name}</Text>
                        </Button>
                      </motion.div>
                    </Center>
                  </Box>
                </Center>
              ))}
            </Carousel>
          </>
          :
          null
        }
      </Box>
    </>
  );
};
