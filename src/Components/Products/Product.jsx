import {
  Box, Grid, GridItem, Image,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { backendURL, cookies, fetchWithAxios, showToast } from '../../BaseFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { setProductDetails, setProductValues } from '../../store/features/productsSlice';
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei';
import { Show3DGLB } from './Show3DGLB';
import { Canvas } from '@react-three/fiber';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

export const Product = () => {
  const dispatch = useDispatch();
  const product = useSelector(state => state.product);

  const getProductDetails = () => {
    fetchWithAxios.get(`/shop/getproddetails/?id=${cookies.get('productId')}`, {})
      .then(function(response) {
          dispatch(setProductDetails(response.data));
        },
      ).catch((e) => {
      showToast('خطا', e.message);
    });
  };

  const getProductValues = () => {
    fetchWithAxios.get(`/shop/getprodvalues/?id=${cookies.get('productId')}`, {})
      .then(function(response) {
          dispatch(setProductValues(response.data));
        },
      ).catch((e) => {
      showToast('خطا', e.message);
    });
  };

  useEffect(() => {
    getProductDetails();
    getProductValues();
  }, []);

  return (
    <>
      <Box mt={5} px={'150px'} h={'580px'}>
        <Grid templateColumns='repeat(5, 1fr)' gap={6}>
          <GridItem colSpan={1} w='100%' h={'700px'}>
            <Canvas shadows camera={{ position: [0, 0, 1.66] }}>
              <Environment preset='forest' />
              <Show3DGLB />
              <ContactShadows position={[0, -0.8, 0]} color='#ffffff' />
              <OrbitControls autoRotate />
            </Canvas>

            <Show3DGLB />
          </GridItem>
          <GridItem colSpan={2} w='100%' h={'700px'} bg='blue.500' />
          <GridItem colSpan={2} w='100%' h={'700px'}>
            {product.productDetails !== {} && product.productDetails.avatar !== undefined && (product.productDetails.avatar).toString().split('.')[(product.productDetails.avatar).toString().split('.').length - 1] === 'glb' ?
              <>
                <Canvas shadows camera={{ position: [0, 0.2, 0.4] }}>
                  <Environment preset='forest' />
                  <Show3DGLB />
                  <ContactShadows position={[0, -0.8, 0]} color='#ffffff' />
                  <OrbitControls autoRotate />
                </Canvas>
                <Show3DGLB />
              </>
              :
              <Zoom>
                <img
                  alt='That Wanaka Tree, New Zealand by Laura Smetsers'
                  src={backendURL + '/' + product.productDetails.avatar}
                  width='1000px'
                />
              </Zoom>
            }
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};
