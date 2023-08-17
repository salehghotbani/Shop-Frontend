import { Box, Button, Center, Flex, Tag, Text } from '@chakra-ui/react';
import Carousel from 'react-multi-carousel';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { backendURL } from '../../../Base/BaseFunctions';

export const BestSellingProducts = () => {
  const product = useSelector(state => state.product);

  const responsive = {
    superLargeDesktop: {
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
        {product.bestSellingProducts.length ?
          <>
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

            <Carousel responsive={responsive}>
              {product.bestSellingProducts.map((value) => (
                <Center>
                  <Box position={'relative'} h={'400px'} w={'200px'} borderTopLeftRadius={'30px'}
                       borderTopRightRadius={'30px'} backgroundColor={'#8FA5D1'}>
                    <Box backgroundImage={backendURL + value.avatar} backgroundRepeat={'no-repeat'} backgroundSize={'cover'}
                         backgroundPosition={'center'} w={'200px'} h={'200px'} />
                    <Center>
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        style={{ position: 'absolute', bottom: '5%', zIndex: 1 }}
                      >
                        <Button backgroundColor={'#1C3347'} _hover={{backgroundColor: '#182e3f'}}>
                          <Text color={'white'}>افزودن به سبد خرید</Text>
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
