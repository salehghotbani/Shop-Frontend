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
  Input,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { StarRating } from '../../Base/StarRating';
import { useDispatch, useSelector } from 'react-redux';
import { setDescription, setNegativePoint, setPositivePoint, setTitle } from '../../store/features/commentProductSlice';
import { fetchWithAxios, MultiSelect, showToast } from '../../Base/BaseFunctions';
import { setHeroDescription, setHeroTitle } from '../../store/features/homeSlice';
import { useLocation } from 'react-router-dom';

export const Comment = () => {
  const commentProduct = useSelector(state => state.commentProduct);
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const getComments = () => {
    fetchWithAxios.get(`/shop/getcommentsprod/?id=${queryParams.get('id')}&page=1&count=10`, {})
      .then(function(response) {
          dispatch(setHeroTitle(response.data.title));
          dispatch(setHeroDescription(response.data.long_text));
        },
      ).catch((e) => {
      showToast('خطا', e.message);
    });
  };

  useEffect(() => {
    getComments();
  }, []);

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
                             setReduxMethod={setPositivePoint} />
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
                             setReduxMethod={setNegativePoint} />
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

        <Button backgroundColor={'green.500'} _hover={{ backgroundColor: 'green.600' }} color={'white'}>
          ارسال
        </Button>
      </Stack>
    </Box>
  );
};
