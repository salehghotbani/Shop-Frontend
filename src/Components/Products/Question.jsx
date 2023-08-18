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
import { fetchWithAxios, showToast } from '../../Base/BaseFunctions';
import { setQuestionForSend } from '../../store/features/questionProductSlice';

export const Question = () => {
  const question = useSelector(state => state.questionProduct);
  const product = useSelector(state => state.product);
  const dispatch = useDispatch();

  const sendQuestion = () => {
    fetchWithAxios.post(`/shop/createquestion/`, {
      'product_id': product.productDetails.id,
      'text': question.questionForSend,
    }).catch((e) => {
      showToast('خطا', e.message);
    });
  };

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
          <Textarea minH={'200px'} placeholder='سوال' value={question.question}
                    onChange={(event) => {
                      dispatch(setQuestionForSend(event.target.value));
                    }} />
        </FormControl>

        <Button backgroundColor={'green.500'} _hover={{ backgroundColor: 'green.600' }} color={'white'}
                onClick={() => sendQuestion()}>
          ارسال
        </Button>
      </Stack>
    </Box>
  );
};
