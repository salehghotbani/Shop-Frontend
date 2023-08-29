import {
  Box,
  Button,
  Center,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Image,
  Input,
  Stack,
  Switch,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { fetchWithAxios, showToast } from '../../Base/BaseFunctions';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setAddress,
  setEmail,
  setFirstName,
  setGender,
  setIsSubmitted,
  setLastName,
  setPhoneNumber,
  setUsername,
} from '../../store/features/profileSlice';
import man_avatar from '../../assets/images/man_avatar.png';
import woman_avatar from '../../assets/images/woman_avatar.jpg';

export const PendingOrders = () => {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.profile);

  const sendCustomerInfo = () => {
    fetchWithAxios.post(`/updatecustomer/`, {
      'username': profile.username,
      'address': profile.address,
      'first_name': profile.firstName,
      'last_name': profile.lastLame,
      'gender': profile.gender ? 'True' : 'False',
    }).then(() => {
      dispatch(setIsSubmitted(false));
    }).catch((e) => {
      showToast('خطا', e.message);
      dispatch(setIsSubmitted(false));
    });
  };

  useEffect(() => {
  }, []);

  return (
    <>

    </>
  );
};
