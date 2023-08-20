import React, { useEffect } from 'react';
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
import { setQuestionForSend, setQuestions } from '../../store/features/questionProductSlice';
import { useLocation } from 'react-router-dom';

export const Question = () => {
  const question = useSelector(state => state.questionProduct);
  const product = useSelector(state => state.product);
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const getQuestion = () => {
    fetchWithAxios.get(`/shop/getquestionsprod/?id=${queryParams.get('id')}&page=1&count=10`, {})
      .then((response) => {
        console.log(response);
        dispatch(setQuestions(response.data.questions));
      })
      .catch((e) => {
        showToast('خطا', e.message);
      });
  };

  const sendQuestion = () => {
    fetchWithAxios.post(`/createquestion/`, {
      'product_id': product.productDetails.id,
      'text': question.questionForSend,
    }).then(() => {
      getQuestion();
    }).catch((e) => {
      showToast('خطا', e.message);
    });
  };

  useEffect(() => {
    getQuestion();
  }, []);

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

      {question.questions !== undefined && question.questions.length !== 0 ?
        <Divider mt={1} borderColor={'gray.400'} />
        :
        null
      }
    </Box>
  );
};
