import React from 'react';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuestion } from '../store/features/questionProduct';

export const Question = () => {
  const questionProduct = useSelector(state => state.questionProduct);
  const dispatch = useDispatch();

  return (
    <Box className={'box_shadow'} p={5} borderRadius={9}>
      <Text as={'b'} fontSize={'20px'}>ثبت سوال:</Text>

      <Divider mt={1} borderColor={'gray.400'} />

      <Stack spacing={2} p={5}>
        <FormControl my={'auto'} isRequired ml={5}>
          <FormLabel width={'100px'} my={'auto'}>
            <Text as={'b'}>
              سوال:
            </Text>
          </FormLabel>
          <Textarea minH={'200px'} placeholder='توضیحات' value={questionProduct.question}
                    onChange={(event) => {
                      dispatch(setQuestion(event.target.value));
                    }} />
        </FormControl>

        <Button backgroundColor={'green.500'} _hover={{ backgroundColor: 'green.600' }} color={'white'}>
          ارسال
        </Button>
      </Stack>
    </Box>
  );
};
