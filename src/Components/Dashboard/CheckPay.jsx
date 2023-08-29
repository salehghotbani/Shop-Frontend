import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchWithAxios, getCurrentDateTime, showToast } from '../../Base/BaseFunctions';
import { Box, Button, Flex, Link, Text, VStack } from '@chakra-ui/react';

export const CheckPay = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const cartPayed = () => {
    fetchWithAxios.post('/delivery/cartpayed/', {
      'id_pay': queryParams.get('TerminalId'),
      'status': queryParams.get('Status') ? 100 : 400,
      'amount': queryParams.get('Amount'),
      'date': getCurrentDateTime(),
      'order_id': queryParams.get('RefNum'),
    })
      .then((response) => {
        showToast('status', response.data);
      })
      .catch((e) => {
        showToast('خطا', e.message);
      });
  };

  useEffect(() => {
    cartPayed();
  }, []);

  return (
    <>
      <Box height={'81vh'} dir={'rtl'}>
        <VStack spacing={5} mt={'10vh'}>
          <Text fontSize={'20px'} as={'b'}>
            <Flex dir={'rtl'}>
              وضعیت تراکنش:
              {queryParams.get('Status') ?
                <Text mx={2} my={'auto'} fontSize={'20px'} color={'green.400'}>
                  موفقیت آمیز بود ({queryParams.get('State')})
                </Text>
                :
                <Text mx={2} my={'auto'} fontSize={'20px'} color={'red.400'}>
                  ناموفق بود ({queryParams.get('State')})
                </Text>
              }
            </Flex>
          </Text>

          <Link href={queryParams.get('RefNum')} fontSize={'18px'}>
            رسید خرید: ({queryParams.get('RefNum')})
          </Link>

          <Button onClick={() => navigate('/info', { replace: true })}>بازگشت به صفحه اصلی</Button>
        </VStack>
      </Box>
    </>
  );
};
