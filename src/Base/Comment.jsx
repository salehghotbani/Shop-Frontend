import React from 'react';
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
import CreatableSelect from 'react-select/creatable';
import { StarRating } from './StarRating';
import { useDispatch, useSelector } from 'react-redux';
import { setDescription, setNegativePoint, setPositivePoint, setTitle } from '../store/features/commentProduct';

export const Comment = () => {
  const commentProduct = useSelector(state => state.commentProduct);
  const dispatch = useDispatch();

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

          <FormControl my={'auto'} my={3} isRequired mr={5}>
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
                <CreatableSelect isMulti
                                 noOptionsMessage={() => null}
                                 components={{
                                   Menu: () => null,
                                   MenuList: () => null,
                                   DropdownIndicator: () => null,
                                   IndicatorSeparator: () => null,
                                 }}
                                 placeholder={'نکات مثبت'}
                                 styles={{
                                   container: (provided) => ({
                                     ...provided,
                                     borderWidth: '0.5px',
                                     borderColor: 'gray.100',
                                     borderRadius: 5,
                                   }),
                                   control: (provided) => ({
                                     ...provided,
                                     backgroundColor: 'white',
                                     cursor: 'text',
                                   }),
                                   multiValue: (provided) => ({
                                     ...provided,
                                     backgroundColor: 'green', // Change this color to your desired tag background color
                                     color: 'white', // Change this color to the text color you prefer for tags
                                     borderRadius: '4px',
                                   }),
                                   multiValueLabel: (provided) => ({
                                     ...provided,
                                     color: 'white',
                                   }),
                                 }}
                                 onChange={(event) => {
                                   dispatch(setPositivePoint(event));
                                 }}
                />
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
                <CreatableSelect isMulti
                                 noOptionsMessage={() => null}
                                 components={{
                                   Menu: () => null,
                                   MenuList: () => null,
                                   DropdownIndicator: () => null,
                                   IndicatorSeparator: () => null,
                                 }}
                                 placeholder={'نکات منفی'}
                                 styles={{
                                   container: (provided) => ({
                                     ...provided,
                                     borderWidth: '0.5px',
                                     borderColor: 'gray.100',
                                     borderRadius: 5,
                                   }),
                                   control: (provided) => ({
                                     ...provided,
                                     backgroundColor: 'white',
                                     cursor: 'text',
                                   }),
                                   multiValue: (provided) => ({
                                     ...provided,
                                     backgroundColor: 'red', // Change this color to your desired tag background color
                                     color: 'white', // Change this color to the text color you prefer for tags
                                     borderRadius: '4px',
                                   }),
                                   multiValueLabel: (provided) => ({
                                     ...provided,
                                     color: 'white',
                                   }),
                                   multiValueRemove: (provided) => ({
                                     ...provided,
                                     '&:hover': {
                                       backgroundColor: 'orange', // Change this color to the desired hover background color
                                     },
                                   }),
                                 }}
                                 onChange={(event) => {
                                   dispatch(setNegativePoint(event));
                                 }}
                />
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
          <Textarea minH={'200px'} placeholder='توضیحات'
                    onChange={(event) => {
                      dispatch(setDescription(event.target.value));
                    }}/>
        </FormControl>

        <Button backgroundColor={'green.500'} _hover={{ backgroundColor: 'green.600' }} color={'white'}>
          ارسال
        </Button>
      </Stack>
    </Box>
  );
};
