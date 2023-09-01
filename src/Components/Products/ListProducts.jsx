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
  Center,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Image,
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
  Text,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';
import {
  setBrandNames,
  setMaximumAmountFilter,
  setNumberElementShownPerPage,
  setPage,
  setProductListFilter,
  setProducts,
  setSelectedCategory,
  setTotalProductsByFiltersAndCategory,
} from '../../store/features/productsSlice';
import Select from 'react-select';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  addToCart,
  backendURL,
  cookies,
  fetchWithAxios,
  Pagination,
  ProductSimple,
  showToast,
} from '../../Base/BaseFunctions';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { minPrice } from '../../Base/BaseAttributes';
import filterSVG from '../../assets/icons/filter.svg';

const GetFilter = ({ getProductsByCategory }) => {
  const dispatch = useDispatch();
  const product = useSelector(state => state.product);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

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

  const removeFilters = () => {
    if (queryParams.has('min'))
      queryParams.delete('min');
    if (queryParams.has('max'))
      queryParams.delete('max');
    if (queryParams.has('brandName'))
      queryParams.delete('brandName');

    const updatedSearch = queryParams.toString();
    navigate({ search: updatedSearch });
    window.location.reload();
  };

  return (
    <>
      <Box position={'sticky'} top={'80px'} dir={'rtl'}>
        <Box className={'box_shadow'} borderRadius={8} py={5} px={7}>
          <Grid templateColumns='repeat(2, 1fr)' gap={4}>
            <GridItem colSpan={1}>
              <Text textAlign={'right'} cursor={'default'} as={'b'}>فیلترها</Text>
            </GridItem>
            <GridItem colSpan={1}>
              <Text textAlign={'left'} cursor={'pointer'} color={'#8c1111'} onClick={removeFilters}>حذف فیلترها</Text>
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
              <AccordionPanel h={'150px'} pb={9}>
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
                            maxHeight: '80px',
                          }),
                          menuList: (provided) => ({
                            ...provided,
                            paddingTop: '0',
                            paddingBottom: '0',
                            maxHeight: '80px',
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
                  min={0} max={product.maximumAmountFilter}
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
            <Pagination dispatch={dispatch} page={product.page} setPage={setPage}
                        numberElementShownPerPage={product.numberElementShownPerPage}
                        totalProducts={product.totalProductsByFiltersAndCategory} />
          </Center>
        </Box>
      </Box>
    </>
  );
};

export const ListProducts = () => {
  const dispatch = useDispatch();
  const product = useSelector(state => state.product);
  const user = useSelector(state => state.user);
  const commentProduct = useSelector(state => state.commentProduct);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const [timeToShowProducts, setTimeToShowProducts] = useState(false);
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const { isOpen, onOpen, onClose } = useDisclosure();

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
          response.data.products.map((value) => {
            tempArray.push(value);
          });
          dispatch(setProducts(tempArray));
          dispatch(setTotalProductsByFiltersAndCategory(response.data.lenght));
          setTimeToShowProducts(true);
        },
      ).catch((e) => {
      showToast('خطا', e.message);
    });
  };

  const getBrands = () => {
    fetchWithAxios.get(`/shop/getbrandcategory/?id=${Number(product.selectedCategory)}`, {})
      .then((response) => {
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
  }, [product.selectedCategory, product.numberElementShownPerPage]);

  const getQueryParameter = () => {
    let maxPriceTemp = 1;
    fetchWithAxios.get(`/shop/getmaxprice/?category_id=${Number(queryParams.get('category'))}`, {})
      .then(function(response) {
          maxPriceTemp = Number(response.data['price__max']);
          dispatch(setMaximumAmountFilter(Number(response.data['price__max'])));

          dispatch(setProductListFilter({
            priceRange: [
              queryParams.get('min') === null ? minPrice.toString() : Number(queryParams.get('min')),
              queryParams.get('max') === null ? maxPriceTemp : Number(queryParams.get('max')),
            ],
            brand: queryParams.get('brandName') === null ? '' : queryParams.get('brandName'),
          }));
          dispatch(setPage(queryParams.get('page') === null ? 1 : queryParams.get('page')));
          dispatch(setSelectedCategory(queryParams.get('category') === null ? Number(product.selectedCategory) : queryParams.get('category')));
        },
      ).catch((e) => {
      showToast('خطا', e.message);
    });
  };

  return (
    <>
      <Grid dir={'rtl'} templateColumns={isMobile ? 'repeat(1, 1fr)' : 'repeat(8, 1fr)'} gap={4} pt={4} px={8}>
        {isMobile ?
          <>
            <Image cursor={'pointer'} onClick={onOpen} src={filterSVG} w={'30px'} h={'30px'} />
            <Drawer placement={'bottom'} onClose={onClose} isOpen={isOpen}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerHeader dir={'rtl'} borderBottomWidth='1px'>فیلتر</DrawerHeader>
                <DrawerBody>
                  <GetFilter getProductsByCategory={getProductsByCategory} />
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </>
          :
          <GridItem minW={'300px'} colSpan={isMobile ? 0 : 2}>
            <GetFilter getProductsByCategory={getProductsByCategory} />
          </GridItem>
        }

        <GridItem colSpan={isMobile ? 1 : 6}>
          <Box w={'100%'} overflowY={'auto'} className={'box_shadow'} p={5} pl={6} borderRadius={8} h={'89vh'}
               dir={'ltr'}>
            <SimpleGrid columns={[1, 1, 2, 3, 4, 5]} spacing={4} mb={5} dir={'rtl'}>
              {timeToShowProducts && product.products.map((value, index) => (
                <Box key={index}>
                  <ProductSimple image={backendURL + '/' + value.avatar} name={value.name} user={user}
                                 navigate={navigate}
                                 onClickEvent={() => {
                                   cookies.set('productId', value.id, { path: '/' });
                                   navigate(`/productInfo?id=${value.id}&category=${product.selectedCategory}`);
                                 }}
                                 price={parseInt((value.price.toString()).replace(/,/g, '')).toLocaleString()}
                                 hasButton={true} buttonFunction={() => addToCart(dispatch, value.id)} />
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        </GridItem>
      </Grid>

      <Box position='fixed' bottom='0' right='0' px={9} py={7}>
        <Menu maxW={'100px'}>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} className={'box_shadow'} backgroundColor={'white'}
                      _hover={{ backgroundColor: '#f3f7fd' }}
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
