import React, { useEffect } from 'react';
import {
  Box,
  Button, Center,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Stack,
  Text,
  Textarea, VStack,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWithAxios, GregorianToJalaliConverter, Pagination, showToast } from '../../Base/BaseFunctions';
import {
  setPage,
  setQuestionForSend,
  setQuestions,
  setTotalProductsByFiltersAndCategory,
} from '../../store/features/questionProductSlice';
import { useLocation, useNavigate } from 'react-router-dom';

export const Question = () => {
  const question = useSelector(state => state.questionProduct);
  const product = useSelector(state => state.product);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const getQuestion = () => {
    fetchWithAxios.get(`/shop/getquestionsprod/?id=${queryParams.get('id')}&page=${question.page}&count=${question.numberElementShownPerPage}`, {})
      .then((response) => {
        dispatch(setQuestions(response.data.questions));
        dispatch(setTotalProductsByFiltersAndCategory(response.data.length));
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
  }, [question.page]);

  return (
    <Box className={'box_shadow'} p={5} borderRadius={9}>
      <Text as={'b'} fontSize={'20px'}>ثبت سوال:</Text>

      <Divider mt={1} borderColor={'gray.400'} />

      {user.isRegistered ?
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
        :
        <VStack spacing={1} p={5}>
          <Text fontSize={'18px'}>برای ثبت سوال ابتدا وارد سایت شوید</Text>
          <Button size={'sm'} color={'white'} backgroundColor={'green.500'} _hover={{ backgroundColor: 'green.600' }}
                  onClick={() => navigate('/login')}>
            ورود
          </Button>
        </VStack>
      }

      {question.questions !== undefined && question.questions.length !== 0 &&
        <Divider mt={1} borderColor={'gray.400'} />}

      {question.questions !== undefined && question.questions.map((value, index) => (
        <Stack key={index} p={6} m={3} className={'box_shadow'} borderRadius={7} backgroundColor={'gray.50'}>

          <Flex>
            <Box my={'auto'}>
              <GregorianToJalaliConverter gregorianDate={value.date} />
            </Box>
          </Flex>

          <Divider mt={1} borderColor={'gray.500'} />

          <Text>{value.text}</Text>
        </Stack>
      ))}

      <Center pt={3}>
        <Pagination dispatch={dispatch} page={question.page} setPage={setPage}
                    numberElementShownPerPage={question.numberElementShownPerPage}
                    totalProducts={question.totalProductsByFiltersAndCategory} />
      </Center>
    </Box>
  );
};
