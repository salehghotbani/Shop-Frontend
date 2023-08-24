import axios from 'axios';
import { Text, createStandaloneToast } from '@chakra-ui/react';
import Cookies from 'universal-cookie';
import CreatableSelect from 'react-select/creatable';
import React from 'react';
import { setProducts, setTotalPrice } from '../store/features/cartSlice';
import moment from 'jalali-moment';
import jalaliMoment from 'jalali-moment';

//http://51.68.171.248:8000
export const backendURL = 'http://localhost:8000';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

export const fetchWithAxios = axios.create({
  baseURL: backendURL,
  withCredentials: true,
});

export const showToast = (title, description, statusIndex = 1, positionIndex = 3, duration = 3000, isClosable = true) => {
  const { ToastContainer, toast } = createStandaloneToast();
  const status = ['success', 'error', 'warning', 'info'][statusIndex];
  const position = [
    'top-right',
    'top',
    'top-left',
    'bottom-right',
    'bottom',
    'bottom-left',
  ][positionIndex];

  toast({
    title: title,
    description: description,
    position: position,
    status: status,
    duration: duration,
    isClosable: isClosable,
  });
};

export const cookies = new Cookies();

export const MultiSelect = ({
                              dispatch,
                              multiValueBackColor,
                              multiValueRemoveBackColor,
                              setReduxMethod,
                              defaultValue,
                            }) => {
  return (
    <CreatableSelect isMulti
                     defaultValue={defaultValue}
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
                         backgroundColor: multiValueBackColor, // Change this color to your desired tag background color
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
                           backgroundColor: multiValueRemoveBackColor, // Change this color to the desired hover background color
                         },
                       }),
                     }}
                     onChange={(event) => {
                       let array = [];
                       for (let i = 0; i < event.length; i++) {
                         array.push(event[i]['value']);
                       }
                       dispatch(setReduxMethod(array));
                     }}
    />
  );
};

export const logout = (navigate) => {
  fetchWithAxios.get('/logout/', {})
    .then(function() {
      navigate('/', { replace: true });
      document.location.reload();
    })
    .catch((e) => {
      showToast('خطا', e.message);
    });
};

export const getProductsCart = (dispatch) => {
  fetchWithAxios.get(`/getprodscart`, {})
    .then((response) => {
      console.log(response);
      dispatch(setTotalPrice(response.data['total_price']));
      dispatch(setProducts(response.data.products));
    })
    .catch((e) => {
      showToast('خطا', e.message);
    });
};

export const addToCart = (dispatch, product_id) => {
  fetchWithAxios.post(`/addtocart/`, {
    'product_id': product_id.toString(),
  }).then(() => {
      getProductsCart(dispatch);
    },
  ).catch((e) => {
    showToast('خطا', e.message);
  });
};

export const removeFromCart = (dispatch, product_id) => {
  fetchWithAxios.post(`/removefromcart/`, {
    'product_id': product_id.toString(),
  }).then(() => {
      getProductsCart(dispatch);
    },
  ).catch((e) => {
    showToast('خطا', e.message);
  });
};

export const GregorianToJalaliConverter = ({ gregorianDate }) => {
  // Parse the original Gregorian date
  const parsedGregorianDate = moment(gregorianDate);

  // Convert the Gregorian date to Jalali (Persian) using jalali-moment
  const jalaliDate = jalaliMoment(parsedGregorianDate).format('jYYYY/jM/jD HH:mm');

  return <Text fontSize={'14px'}>{jalaliDate}</Text>;
};
