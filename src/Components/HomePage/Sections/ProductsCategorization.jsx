import { SimpleGrid, Text, Box, Center } from '@chakra-ui/react';

export const ProductsCategorization = () => {
  return (
    <>
      <Box backgroundColor={'#1C3347'} py={'40px'}>
        {/* Title : */}
        <Center>
          <Box px={8} py={3} bg={'white'} borderRadius={50} mb={7}>
            <Text color={'black'} fontSize={'4xl'}>دسته بندی محصولات</Text>
          </Box>
        </Center>

        {/* Categorization table : */}
        <SimpleGrid align={'center'} spacing={9} columns={[2, 2, 4, 4]}>
          <Center>
            <Box w={'300px'} h={'250px'} bg={'#FFFFFF'} borderRadius={30}>
              <Center color={'#000000'}>
                <Text>box1</Text>
              </Center>
            </Box>
          </Center>

          <Center>
            <Box w={'300px'} h={'250px'} bg={'#FFFFFF'} borderRadius={30}>
              <Center color={'#000000'}>
                <Text>box2</Text>
              </Center>
            </Box>
          </Center>

          <Center>
            <Box w={'300px'} h={'250px'} bg={'#FFFFFF'} borderRadius={30}>
              <Center color={'#000000'}>
                <Text>box3</Text>
              </Center>
            </Box>
          </Center>

          <Center>
            <Box w={'300px'} h={'250px'} bg={'#FFFFFF'} borderRadius={30}>
              <Center color={'#000000'}>
                <Text>box4</Text>
              </Center>
            </Box>
          </Center>

          <Center>
            <Box w={'300px'} h={'250px'} bg={'#FFFFFF'} borderRadius={30}>
              <Center color={'#000000'}>
                <Text>box5</Text>
              </Center>
            </Box>
          </Center>

          <Center>
            <Box w={'300px'} h={'250px'} bg={'#FFFFFF'} borderRadius={30}>
              <Center color={'#000000'}>
                <Text>box6</Text>
              </Center>
            </Box>
          </Center>

          <Center>
            <Box w={'300px'} h={'250px'} bg={'#FFFFFF'} borderRadius={30}>
              <Center color={'#000000'}>
                <Text>box7</Text>
              </Center>
            </Box>
          </Center>

          <Center>
            <Box w={'300px'} h={'250px'} bg={'#FFFFFF'} borderRadius={30}>
              <Center color={'#000000'}>
                <Text>box8</Text>
              </Center>
            </Box>
          </Center>
        </SimpleGrid>
      </Box>
    </>
  );
};
