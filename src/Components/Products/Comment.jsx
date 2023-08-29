import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Input,
  Stack,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { StarRating } from './StarRating';
import { useDispatch, useSelector } from 'react-redux';
import {
  setComments,
  setDescription,
  setNegativePoint,
  setPositivePoint,
  setRate,
  setTitle,
} from '../../store/features/commentProductSlice';
import { fetchWithAxios, GregorianToJalaliConverter, MultiSelect, showToast } from '../../Base/BaseFunctions';
import { useLocation } from 'react-router-dom';
import { AddIcon, MinusIcon, StarIcon } from '@chakra-ui/icons';

export const Comment = () => {
  const commentProduct = useSelector(state => state.commentProduct);
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const getCommentsAxios = () => {
    fetchWithAxios.get(`/shop/getcommentsprod/?id=${queryParams.get('id')}&page=1&count=10`, {})
      .then(function(response) {
          dispatch(setComments(response.data.comments));
        },
      ).catch((e) => {
      showToast('خطا', e.message);
    });
  };

  const setCommentsAxios = () => {
    fetchWithAxios.post('/shop/createcomment/', {
      'title': commentProduct.title,
      'text': commentProduct.description,
      'rate': commentProduct.rate,
      'positive': commentProduct.positivePoint,
      'negative': commentProduct.negativePoint,
      'product_id': queryParams.get('id'),
    })
      .then((response) => {
        dispatch(setTitle(''));
        dispatch(setPositivePoint([]));
        dispatch(setNegativePoint([]));
        dispatch(setDescription(''));
        dispatch(setRate(0));
        showToast('موفق', 'نظرات ارسال شد', 0);
        getCommentsAxios();
      })
      .catch((e) => {
        showToast('خطا', e.message);
      });
  };

  useEffect(() => {
    getCommentsAxios();
  }, []);

  const getColorStar = (star) => {
    switch (star) {
      case 1:
      case 2:
        return 'red.400';
      case 3:
        return 'yellow.400';
      case 4:
        return 'green.200';
      case 5:
        return 'green.400';
      default:
        return 'orange.400';
    }
  };

  return (
    <Box className={'box_shadow'} p={5} borderRadius={9}>
      <Text as={'b'} fontSize={'20px'}>ثبت نظر:</Text>

      <Divider mt={1} borderColor={'gray.400'} />

      <Stack spacing={2} p={5}>
        <Flex>
          <FormControl my={'auto'} isRequired ml={5}>
            <Flex dir={'rtl'}>
              <FormLabel width={'100px'} my={'auto'}>
                <Text as={'b'}>
                  عنوان نظر:
                </Text>
              </FormLabel>
              <Input dir={'rtl'} type='text' placeholder={'عنوان نظر'} value={commentProduct.title}
                     onChange={(event) => {
                       dispatch(setTitle(event.target.value));
                     }} />
            </Flex>
          </FormControl>

          <FormControl my={'auto'} isRequired mr={5}>
            <Grid templateColumns='repeat(5, 1fr)' gap={4}>
              <GridItem colSpan={2}>
                <FormLabel width={'100px'} my={'auto'}>
                  <Text as={'b'}>
                    امتیاز:
                  </Text>
                </FormLabel>
              </GridItem>
              <GridItem colStart={4} colEnd={6}>
                <StarRating />
              </GridItem>
            </Grid>
          </FormControl>
        </Flex>

        <Flex>
          <FormControl my={'auto'} isRequired ml={5}>
            <Flex dir={'rtl'}>
              <FormLabel width={'115px'} my={'auto'}>
                <Text as={'b'}>
                  نکات مثبت:
                </Text>
              </FormLabel>
              <Box w={'100%'}>
                <MultiSelect dispatch={dispatch} multiValueBackColor={'green'} multiValueRemoveBackColor={'red.500'}
                             setReduxMethod={setPositivePoint} defaultValue={commentProduct.positivePoint} />
              </Box>
            </Flex>
          </FormControl>

          <FormControl my={'auto'} isRequired mr={5}>
            <Flex dir={'rtl'}>
              <FormLabel width={'115px'} my={'auto'}>
                <Text as={'b'}>
                  نکات مثبت:
                </Text>
              </FormLabel>
              <Box w={'100%'}>
                <MultiSelect dispatch={dispatch} multiValueBackColor={'red'} multiValueRemoveBackColor={'orange'}
                             setReduxMethod={setNegativePoint} defaultValue={commentProduct.negativePoint} />
              </Box>
            </Flex>
          </FormControl>
        </Flex>

        <FormControl my={'auto'} isRequired ml={5}>
          <FormLabel width={'100px'} my={'auto'}>
            <Text as={'b'}>
              توضیحات:
            </Text>
          </FormLabel>
          <Textarea minH={'200px'} placeholder='توضیحات' value={commentProduct.description}
                    onChange={(event) => {
                      dispatch(setDescription(event.target.value));
                    }} />
        </FormControl>

        <Button backgroundColor={'green.500'} _hover={{ backgroundColor: 'green.600' }} color={'white'}
                onClick={() => setCommentsAxios()}>
          ارسال
        </Button>
      </Stack>

      {/*"id": 1,
      "title": "عنوان",
      "text": "خیلی خوشم نیومد",
      "date": "2023-08-19T22:42:42.239309+03:30",
      "rate": 4,
      "positive": [
      "نداشت"
      ],
      "negative": [
      "خیلی خوب نبود"
      ],
      "product": 4,
      "customer": 3*/}

      {commentProduct.comments !== undefined && commentProduct.comments.length !== 0 ?
        <Divider mt={1} borderColor={'gray.400'} />
        :
        null
      }

      {commentProduct.comments !== undefined && commentProduct.comments.map((value, index) => {
        if (value.title !== '') {
          return (
            <>
              <Stack key={index} p={6} m={3} className={'box_shadow'} borderRadius={7} backgroundColor={'gray.50'}>
                <Flex>
                  <Tag variant='subtle' backgroundColor={() => getColorStar(value.rate)}>
                    <TagLeftIcon boxSize='12px' as={StarIcon} />
                    <TagLabel>{value.rate}</TagLabel>
                  </Tag>

                  <Text as={'b'} mx={3}>{value.title}</Text>

                  <Box my={'auto'}>
                    <GregorianToJalaliConverter gregorianDate={value.date} />
                  </Box>
                </Flex>p={6} m={3} className={'box_shadow'} borderRadius={7}

                <Divider mt={1} borderColor={'gray.500'} />

                {/*{array.length - 1 !== index ? <Divider mt={1} borderColor={'gray.500'} /> : <></>}*/}

                <Stack mx={8}>
                  <Text>{value.text}</Text>

                  <Box>
                    {value.positive.map((positive_value, positive_index) => (
                      <HStack>
                        <AddIcon w={'10px'} color={'green.600'} />
                        <Text key={positive_index}>{positive_value}</Text>
                      </HStack>
                    ))}

                    {value.negative.map((negative_value, negative_index) => (
                      <HStack>
                        <MinusIcon w={'10px'} color={'red.600'} />
                        <Text key={negative_index}>{negative_value}</Text>
                      </HStack>
                    ))}
                  </Box>
                </Stack>
              </Stack>
            </>
          );
        } else {
          return <></>;
        }
      })}
    </Box>
  );
};
