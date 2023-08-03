import { SimpleGrid, Text, Box, AbsoluteCenter,  } from '@chakra-ui/react';


export const ProductsCategorization = () => {
  return (
    <>
      <Box >

        {/* Title : */}
        <Box position={'relative'} p={2} alignContent={'center'}  h={'100px'} bg={'#1C3347'} borderColor={'blueviolet'}  >
          <AbsoluteCenter  bg={'#FFFFFF'}  color={'#000000'}  fontSize={'4xl'} borderRadius={50}>
            <Text   >دسته بندی محصولات</Text>
          </AbsoluteCenter>
        </Box>

        {/* Categorization table : */}
        <SimpleGrid align={'center'} spacing={30} columns={4}  minHeight={'771px'}  bg={'#1C3347'} >

          <Box position={'relative'} alignContent={'center'}  w={'300px'} h={'250px'} bg={'#FFFFFF'} borderRadius={30}>
            <AbsoluteCenter  color={'#000000'}   >
              <Text >box1</Text>
            </AbsoluteCenter>
          </Box>
          <Box position={'relative'} alignContent={'center'}  w={'300px'} h={'250px'} bg={'#FFFFFF'} borderRadius={30}>
            <AbsoluteCenter  color={'#000000'}   >
              <Text >box2</Text>
            </AbsoluteCenter>
          </Box>




          <Box position={'relative'} alignContent={'center'}  w={'300px'} h={'250px'} bg={'#FFFFFF'} borderRadius={30}>
            <AbsoluteCenter  color={'#000000'}   >
              <Text >box3</Text>
            </AbsoluteCenter>
          </Box>
          <Box position={'relative'} alignContent={'center'}  w={'300px'} h={'250px'} bg={'#FFFFFF'} borderRadius={30}>
            <AbsoluteCenter  color={'#000000'}   >
              <Text >box4</Text>
            </AbsoluteCenter>
          </Box>




          <Box position={'relative'} alignContent={'center'}  w={'300px'} h={'250px'} bg={'#FFFFFF'} borderRadius={30}>
            <AbsoluteCenter  color={'#000000'}   >
              <Text >box5</Text>
            </AbsoluteCenter>
          </Box>
          <Box position={'relative'} alignContent={'center'}  w={'300px'} h={'250px'} bg={'#FFFFFF'} borderRadius={30}>
            <AbsoluteCenter  color={'#000000'}   >
              <Text >box6</Text>
            </AbsoluteCenter>
          </Box>




          <Box position={'relative'} alignContent={'center'}  w={'300px'} h={'250px'} bg={'#FFFFFF'} borderRadius={30}>
            <AbsoluteCenter  color={'#000000'}   >
              <Text >box7</Text>
            </AbsoluteCenter>
          </Box>
          <Box position={'relative'} alignContent={'center'}  w={'300px'} h={'250px'} bg={'#FFFFFF'} borderRadius={30}>
            <AbsoluteCenter  color={'#000000'}   >
              <Text >box8</Text>
            </AbsoluteCenter>
          </Box>

        </SimpleGrid>
      </Box>

    </>








  );
};
