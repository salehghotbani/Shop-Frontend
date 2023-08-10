import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider, Flex, FormControl, FormLabel,
  Grid,
  GridItem, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Text,
} from '@chakra-ui/react';
import { setProductListFilter } from '../../store/features/productsSlice';
import { Blue7 } from '../../BaseAttributes';
import { setUsername } from '../../store/features/registerSlice';

export const Products = () => {
  const dispatch = useDispatch();
  const product = useSelector(state => state.product);

  return (
    <>
      <Grid dir={'rtl'} templateColumns='repeat(8, 1fr)' gap={4} pt={4} px={8}>
        <GridItem colStart={3} colEnd={9}>

        </GridItem>

        <GridItem dir={'rtl'} colStart={1} colEnd={3} className={'box_shadow'} borderRadius={8} pt={5}
                  px={7}>
          <Grid templateColumns='repeat(2, 1fr)' gap={4}>
            <GridItem colSpan={1}>
              <Text textAlign={'right'} cursor={'default'} as={'b'}>فیلترها</Text>
            </GridItem>
            <GridItem colSpan={1}>
              <Text textAlign={'left'} cursor={'pointer'} color={'#8c1111'}>حذف فیلترها</Text>
            </GridItem>
          </Grid>

          <Box mt={2}>
            <Divider borderColor={'black'} orientation='horizontal' />
          </Box>

          <Accordion allowMultiple>
            <AccordionItem>
              <h2>
                <AccordionButton _hover={{ backgroundColor: '#f3f7fd' }} borderBottomRadius={8}>
                  <Box as="span" flex='1' textAlign='right'>
                    برند
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton _hover={{ backgroundColor: '#f3f7fd' }} borderBottomRadius={8}>
                  <Box as='span' flex='1' textAlign='right'>
                    محدوده قیمت
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Grid dir={'rtl'} templateColumns='repeat(2, 1fr)' gap={4}>
                  <GridItem colSpan={1}>
                    <FormControl>
                      <FormLabel my={'auto'}><Text>از مبلغ:</Text></FormLabel>
                      <NumberInput size='sm' value={product.productListFilter.priceRange[1]} min={0} step={10000}
                                   onChange={(event) => {
                                     dispatch(setProductListFilter({
                                       priceRange: [Number(product.productListFilter.priceRange[0]), Number(event)],
                                       brand: product.productListFilter.brand,
                                     }));
                                   }}>
                        <NumberInputField dir={'ltr'} />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>
                  </GridItem>

                  <GridItem colSpan={1}>
                    <FormControl>
                      <FormLabel my={'auto'}><Text>تا مبلغ:</Text></FormLabel>
                      <NumberInput size='sm' value={product.productListFilter.priceRange[0]} min={0} step={10000}
                                   onChange={(event) => {
                                     console.log([Number(event), Number(product.productListFilter.priceRange[1])]);
                                     dispatch(setProductListFilter({
                                       priceRange: [Number(event), Number(product.productListFilter.priceRange[1])],
                                       brand: product.productListFilter.brand,
                                     }));
                                   }}>
                        <NumberInputField dir={'ltr'} />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>
                  </GridItem>
                </Grid>

                <RangeSlider
                  aria-label={['min', 'max']}
                  colorScheme='pink'
                  mt={4}
                  min={0} max={3000000}
                  step={1000}
                  value={product.productListFilter.priceRange}
                  onChange={(event) => {
                    dispatch(setProductListFilter({ priceRange: event, brand: product.productListFilter.brand }));
                  }}
                >
                  <RangeSliderTrack>
                    <RangeSliderFilledTrack />
                  </RangeSliderTrack>
                  <RangeSliderThumb index={0} />
                  <RangeSliderThumb index={1} />
                </RangeSlider>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </GridItem>
      </Grid>
    </>
  );
};
