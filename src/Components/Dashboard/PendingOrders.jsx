import { fetchWithAxios, showToast } from '../../Base/BaseFunctions';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setIsSubmitted,
} from '../../store/features/profileSlice';

export const PendingOrders = () => {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.profile);

  const sendCustomerInfo = () => {
    fetchWithAxios.get(`/delivery/getpendigorders`, {})
      .then((response) => {
        console.log('************',response);
      }).catch((e) => {
      showToast('خطا', e.message);
      dispatch(setIsSubmitted(false));
    });
  };

  useEffect(() => {
    sendCustomerInfo();
  }, []);

  return (
    <>

    </>
  );
};
