import { Box, Image, Link, SimpleGrid } from '@chakra-ui/react';
import { backendURL, fetchWithAxios } from '../BaseFunctions';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setENamads } from '../store/features/footerSlice';
import { useNavigate } from 'react-router-dom';

export const Footer = () => {
  const dispatch = useDispatch();
  const footer = useSelector(state => state.footer);
  const navigate = useNavigate();

  const getENamad = () => {
    fetchWithAxios.get('/shop/getenamad/', {})
      .then(function(response) {
          let tempArray = [];
          response.data.enamad.map((value) => {
            console.log(value?.image);
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
    <>
      <Box h={'264px'} backgroundColor={'#1C3347'}>
        {footer.eNamads.map((value) => (
          <SimpleGrid columns={3} spacing={10} p={4}>
            <Link w={'150px'} isExternal={true} href={value.url}>
              <Image src={backendURL + '/' + value.images} alt={'image'} />
            </Link>
          </SimpleGrid>
        ))}
      </Box>
    </>
  );
};
