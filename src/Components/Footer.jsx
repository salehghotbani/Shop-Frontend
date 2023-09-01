import {
  Box,
  Container,
  Stack,
  Text,
  Flex,
  useColorModeValue,
  HStack,
  Image,
  Center, Grid, GridItem, SimpleGrid, Link,
} from '@chakra-ui/react'
import logoPng from "../assets/images/Logo.png";
import {backendURL, fetchWithAxios} from "../Base/BaseFunctions";
import {setENamads} from "../store/features/footerSlice";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export const Footer = () => {
  const dispatch = useDispatch();
  const footer = useSelector(state => state.footer);
  const navigate = useNavigate();

  const getENamad = () => {
    fetchWithAxios.get('/shop/getenamad/', {})
      .then(function(response) {
          let tempArray = [];
          response.data.enamad.map((value) => {
            tempArray.push({ images: value?.image, url: value?.long_text });
          });
          dispatch(setENamads(tempArray));
        },
      ).catch(() => {
      dispatch(setENamads([{}]));
    });
  };

  useEffect(() => {
    getENamad();
  }, []);

  return (
    <Box bg={'#1C3348'} color={'gray.200'}>
      <Grid templateColumns='repeat(4, 1fr)' gap={4} p={6}>
        <GridItem colStart={1} colEnd={3} my={'auto'}>
          {footer.eNamads.map((value) => (
            <SimpleGrid columns={3} spacing={10} p={4}>
              <Link w={'150px'} isExternal={true} href={value.url}>
                <Image src={backendURL + '/' + value.images} alt={'image'} />
              </Link>
            </SimpleGrid>
          ))}
        </GridItem>
        <GridItem colStart={3} colEnd={5} my={'auto'}>

        </GridItem>
      </Grid>
      <Box py={10}>
        <Flex
          align={'center'}
          _before={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: useColorModeValue('gray.200', 'gray.700'),
            flexGrow: 1,
            mr: 8,
          }}
          _after={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: useColorModeValue('gray.200', 'gray.700'),
            flexGrow: 1,
            ml: 8,
          }}>
          <Center mt={1}>
            <HStack spacing={2}>
              <Text mt={1} fontSize={'17px'} as={'b'} color={'white'}>
                فروشگاه
              </Text>
              <Image src={logoPng} w={'50px'} my={'-20px'}/>
            </HStack>
          </Center>
        </Flex>
        <Text pt={6} fontSize={'sm'} textAlign={'center'} dir={'rtl'}>
          © 2023 تمامی حقوق محفوظ است
        </Text>
      </Box>
    </Box>
  )
}
