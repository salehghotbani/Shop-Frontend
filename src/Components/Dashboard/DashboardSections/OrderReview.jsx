import { fetchWithAxios, showToast } from '../../../Base/BaseFunctions';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setAddress,
  setEmail,
  setFirstName,
  setGender,
  setLastName,
  setPhoneNumber,
  setUsername,
} from '../../../store/features/profileSlice';
import { Box } from '@chakra-ui/react';

export const OrderReview = () => {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.profile);

  const getCustomerInfo = () => {
    fetchWithAxios.get(`/getcustomerinfo`, {})
      .then(function(response) {
          const data = response.data;

          dispatch(setUsername(data.username));
          dispatch(setEmail(data.email));
          dispatch(setFirstName(data.first_name));
          dispatch(setLastName(data.last_name));
          dispatch(setGender(data.gender));
          dispatch(setPhoneNumber(data.phone_number));
          dispatch(setAddress(data.address));
        },
      ).catch((e) => {
      showToast('خطا', e.message);
    });
  };

  useEffect(() => {
    // getCustomerInfo();
  }, []);

  return (
    <Box h={'89vh'} borderRadius={'30px'} className={'box_shadow'} dir={'ltr'} p={5} overflowY={'auto'}>

    </Box>
  );
};
