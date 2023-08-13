import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  ButtonGroup,
  Center,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import {
  setBrandNames,
  setNumberElementShownPerPage,
  setPage,
  setProductListFilter,
  setProducts,
  setSelectedCategory,
} from '../../store/features/productsSlice';
import Select from 'react-select';
import { useLocation, useNavigate } from 'react-router-dom';
import { backendURL, fetchWithAxios, showToast } from '../../BaseFunctions';
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { maxPrice, minPrice } from '../../BaseAttributes';

export const Products = () => {
  const dispatch = useDispatch();
  const product = useSelector(state => state.product);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const [timeToShowProducts, setTimeToShowProducts] = useState(false);

  const getProductsByCategory = () => {
    let jsonToAPI = {
      'min_price': product.productListFilter.priceRange[0],
      'max_price': product.productListFilter.priceRange[1],
    };
    if (product.productListFilter.brand !== '') {
      jsonToAPI['brand'] = product.productListFilter.brand;
    }

    fetchWithAxios.post(`/shop/getprodbyfilter/?id=${Number(product.selectedCategory)}&page=${Number(product.page)}&count=${Number(product.numberElementShownPerPage)}`, jsonToAPI)
      .then(function(response) {
          let tempArray = [];
          console.log(response.data);
          response.data.products.map((value) => {
            tempArray.push(value);
          });
          dispatch(setProducts(tempArray));
          setTimeToShowProducts(true);
        },
      ).catch((e) => {
      showToast('خطا', e.message);
    });
  };

  const getBrands = () => {
    fetchWithAxios.get(`/shop/getbrandcategory/?id=${Number(product.selectedCategory)}`, {})
      .then(function(response) {
          console.log('brands', response);
          let tempArray = [];
          response.data.brands.map((value) => {
            tempArray.push({ value: value, label: value });
          });
          dispatch(setBrandNames(tempArray));
        },
      ).catch((e) => {
      showToast('خطا', e.message);
    });
  };

  useEffect(() => {
    getQueryParameter();

    if (Number(product.selectedCategory) !== 0) {
      getProductsByCategory();
      getBrands();
    }
  }, [product.selectedCategory]);

  const getQueryParameter = () => {
    dispatch(setProductListFilter({
      priceRange: [
        queryParams.get('min') === null ? minPrice.toString() : Number(queryParams.get('min')),
        queryParams.get('max') === null ? maxPrice.toString() : Number(queryParams.get('max')),
      ],
      brand: queryParams.get('brandName') === null ? '' : queryParams.get('brandName'),
    }));
    dispatch(setPage(queryParams.get('page') === null ? 1 : queryParams.get('page')));
    dispatch(setSelectedCategory(queryParams.get('category') === null ? Number(product.selectedCategory) : queryParams.get('category')));
  };

  const handleUpdateQueryParam = () => {
    queryParams.set('min', product.productListFilter.priceRange[0].toString());
    queryParams.set('max', product.productListFilter.priceRange[1].toString());
    queryParams.set('brandName', product.productListFilter.brand);
    queryParams.set('category', product.selectedCategory.toString());
    queryParams.set('page', product.page.toString());

    const updatedSearch = queryParams.toString();

    navigate({ search: updatedSearch });
    getProductsByCategory();
  };

  const Pagination = () => {
    const pageRange = 5;
    const totalPages = 100;

    let startPage = Math.max(1, Number(product.page) - Math.floor(pageRange / 2));
    let endPage = Math.min(totalPages, startPage + pageRange - 1);

    if (totalPages <= 5){
      endPage = totalPages;
    }

    if (endPage - startPage + 1 < pageRange) {
      startPage = Math.max(1, endPage - pageRange + 1);
    }

    return (
      <ButtonGroup spacing='2'>
        <Button backgroundColor={'white'}
                borderColor={'gray.300'}
                textColor={'gray.700'}
                borderRadius={4} size={'sm'} borderWidth={1}
                onClick={() => {
                  if (Number(product.page) > 1) {
                    dispatch(setPage(Number(product.page) - 1));
                  } else {
                    dispatch(setPage(1));
                  }
                }}>
          <ChevronRightIcon />
        </Button>

        {Array.from({ length: endPage - startPage + 1 }, (_, i) => i + startPage).map((ItteratePage, index) => (
          <Button key={index}
                  size={'sm'}
                  borderWidth={1}
                  disabled={Number(product.page) === ItteratePage}
                  borderRadius={4}
                  onClick={() => {
                    dispatch(setPage(ItteratePage));
                  }}
                  backgroundColor={Number(product.page) === ItteratePage ? 'white' : 'gray.200'}
                  borderColor={'gray.300'}
                  _hover={{ backgroundColor: Number(product.page) === ItteratePage ? 'gray.200' : 'gray.600' }}>
            {ItteratePage}
          </Button>
        ))}

        <Button backgroundColor={'white'}
                borderColor={'gray.300'}
                textColor={'gray.700'}
                borderRadius={4} size={'sm'} borderWidth={1}
                onClick={() => {
                  if (Number(product.page) < endPage) {
                    dispatch(setPage(Number(product.page) + 1));
                  } else {
                    dispatch(setPage(endPage));
                  }
                }}>
          <ChevronLeftIcon />
        </Button>
      </ButtonGroup>
    );
  };

  return (
    <>
      <Grid dir={'rtl'} templateColumns='repeat(8, 1fr)' gap={4} pt={4} px={8}>
        <GridItem colStart={1} colEnd={3}>
          <Box position={'sticky'} top={'80px'} dir={'rtl'}>
            <Box className={'box_shadow'} borderRadius={8} py={5} px={7}>
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
                      <Box as='span' flex='1' textAlign='right'>
                        برند
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={9}>
                    <Select focusBorderColor='transparent' inputId={'select_brand_search_id'}
                            options={product.brandNames} placeholder={'جستجو کنید'}
                            noOptionsMessage={() => 'موردی یافت نشد'}
                            styles={{
                              placeholder: (provided) => ({
                                ...provided,
                                color: 'gray',
                              }),
                              option: (defaultStyles, state) => ({
                                ...defaultStyles,
                                color: 'black',
                                borderColor: 'black',
                                direction: 'rtl',
                                cursor: 'pointer',
                              }),
                              dropdownIndicator: (provided, state) => ({
                                ...provided,
                                color: 'black',
                              }),
                              input: (provided, state) => ({
                                ...provided,
                                color: 'black',
                              }),
                              control: (defaultStyles) => ({
                                ...defaultStyles,
                                backgroundColor: 'transparent',
                                borderColor: 'gray.200',
                                borderWidth: 1,
                                boxShadow: 'none',
                                boxSizing: '10px',
                                cursor: 'text',
                              }),
                              menu: (provided) => ({
                                ...provided,
                                marginTop: '-4.5px',
                                marginBottom: '-4.5px',
                                maxHeight: '200px',
                              }),
                              menuList: (provided) => ({
                                ...provided,
                                paddingTop: '0',
                                paddingBottom: '0',
                                maxHeight: '200px',
                              }),
                              singleValue: (defaultStyles) => ({ ...defaultStyles, color: '#000000' }),
                            }}
                            onChange={(event) => {
                              dispatch(setProductListFilter({
                                priceRange: [product.productListFilter.priceRange[0], product.productListFilter.priceRange[1]],
                                brand: event.value.toString(),
                              }));
                            }} />
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

              <Button backgroundColor={'green.200'} size={'sm'} mt={2} _hover={{ backgroundColor: 'green.300' }}
                      onClick={handleUpdateQueryParam}>
                اعمال فیلتر
              </Button>
            </Box>

            <Box mt={5}>
              <Center>
                <Pagination />
              </Center>
            </Box>
          </Box>
        </GridItem>

        <GridItem colStart={3} colEnd={9}>
          <SimpleGrid columns={5} spacing={4} mb={5}>
            {timeToShowProducts && product.products.map((value, index) => (
              <Box id={'id' + index} key={index} w={'270px'} h={'470px'} borderRadius={8}
                   cursor={'pointer'} borderWidth={1}
                   onMouseEnter={() => {
                     document.getElementById('id' + index).classList.add('box_shadow');
                   }}
                   onMouseLeave={() => {
                     document.getElementById('id' + index).classList.remove('box_shadow');
                   }}>
                <Center>
                  <Box backgroundImage={backendURL + '/' + value.avatar} w={'240px'} h={'240px'} mt={'30px'}
                       backgroundPosition={'center'} backgroundRepeat={'no-repeat'} backgroundSize={'cover'} />
                </Center>
                <Stack mx={5} mt={6}>
                  <Text fontSize={'18px'} as={'b'}>{value.name}</Text>
                  <Text fontSize={'16px'} textAlign={'left'}>
                    قیمت: {value.price !== undefined && parseInt((value.price.toString()).replace(/,/g, '')).toLocaleString()} تومان
                  </Text>

                  <Text color={'red'} fontSize={'12px'}>
                    تعداد
                    فروش: {value.number_sell !== undefined && parseInt((value.number_sell.toString()).replace(/,/g, '')).toLocaleString()}
                  </Text>
                </Stack>
              </Box>
            ))}
          </SimpleGrid>
        </GridItem>
      </Grid>

      <Box position='fixed' bottom='0' right='0' px={9} py={7}>
        <Menu maxW={'100px'}>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} className={'box_shadow'}
                      _hover={{ backgroundColor: '#f3f7fd' }} backgroundColor={'white'}
                      _active={{ backgroundColor: '#f3f7fd' }}>
            {product.numberElementShownPerPage}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => dispatch(setNumberElementShownPerPage(10))} value={10}>10</MenuItem>
            <MenuItem onClick={() => dispatch(setNumberElementShownPerPage(30))} value={30}>30</MenuItem>
            <MenuItem onClick={() => dispatch(setNumberElementShownPerPage(50))} value={50}>50</MenuItem>
            <MenuItem onClick={() => dispatch(setNumberElementShownPerPage(70))} value={70}>70</MenuItem>
            <MenuItem onClick={() => dispatch(setNumberElementShownPerPage(100))} value={100}>100</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </>
  );
};
