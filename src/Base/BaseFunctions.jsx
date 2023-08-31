import axios from 'axios';
import { Text, createStandaloneToast, ButtonGroup, Button } from '@chakra-ui/react';
import Cookies from 'universal-cookie';
import CreatableSelect from 'react-select/creatable';
import React from 'react';
import { setProducts, setTotalPrice } from '../store/features/cartSlice';
import moment from 'jalali-moment';
import jalaliMoment from 'jalali-moment';
import { setRegistrationStatus, setUsername } from '../store/features/userSlice';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Environment, OrbitControls } from '@react-three/drei';
import { Show3DGLB } from '../Components/Products/Show3DGLB';
import { Canvas } from '@react-three/fiber';

// https://backend.ghotbani.ir
export const backendURL = 'http://localhost:8000';
// export const backendURL = 'https://backend.ghotbani.ir';
export const frontendURL = 'http://frontend.ghotbani.ir';

export const cookies = new Cookies();

// const csrfToken = cookies.get('csrftoken');
// axios.defaults.xsrfCookieName = 'csrftoken';
// axios.defaults.xsrfHeaderName = 'X-CSRFToken';
// axios.defaults.withCredentials = true;
// axios.defaults.headers.common['X-CSRFToken'] = csrfToken;

export const fetchWithAxios = axios.create({
  baseURL: backendURL,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
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
      navigate('/');
      document.location.reload();
    })
    .catch((e) => {
      showToast('خطا', e.message);
    });
};

export const getProductsCart = (dispatch) => {
  fetchWithAxios.get(`/getprodscart`, {})
    .then((response) => {
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

export const checkAuth = async (dispatch) => {
  await fetchWithAxios.get('/shop/checkauth/', {})
    .then(function(response) {
        dispatch(setRegistrationStatus(true));
        dispatch(setUsername(response.data.username));
        return true;
      },
    ).catch(() => {
      dispatch(setUsername(''));
      dispatch(setRegistrationStatus(false));
      return false;
    });
};

export const getCurrentDateTime = () => {
  const now = new Date();

  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, '0');
  const day = String(now.getUTCDate()).padStart(2, '0');

  const hours = String(now.getUTCHours()).padStart(2, '0');
  const minutes = String(now.getUTCMinutes()).padStart(2, '0');
  const seconds = String(now.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(now.getUTCMilliseconds()).padStart(6, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}+00`;
};

export const Pagination = ({
                             totalProducts,
                             page,
                             numberElementShownPerPage,
                             dispatch,
                             setPage,
                           }) => {
  const pageRange = 5;
  const totalPages = Math.ceil(totalProducts / numberElementShownPerPage);

  let startPage = Math.max(1, page - Math.floor(pageRange / 2));
  let endPage = Math.min(totalPages, startPage + pageRange - 1);

  if (totalPages > 1) {
    if (totalPages <= 5) {
      endPage = totalPages;
    }

    if (endPage - startPage + 1 < pageRange) {
      startPage = Math.max(1, endPage - pageRange + 1);
    }

    return (
      <ButtonGroup spacing='2'>
        <Button backgroundColor={'white'}
                borderColor={'gray.300'}
                textColor={'gray.700'}
                borderRadius={4} size={'sm'} borderWidth={1}
                onClick={() => {
                  if (page > 1) {
                    dispatch(setPage(page - 1));
                  } else {
                    dispatch(setPage(1));
                  }
                }}>
          <ChevronRightIcon />
        </Button>

        {Array.from({ length: endPage - startPage + 1 }, (_, i) => i + startPage).map((ItteratePage, index) => (
          <Button key={index}
                  size={'sm'}
                  borderWidth={1}
                  disabled={page === ItteratePage}
                  borderRadius={4}
                  onClick={() => {
                    dispatch(setPage(ItteratePage));
                  }}
                  backgroundColor={page === ItteratePage ? 'white' : 'gray.200'}
                  borderColor={'gray.300'}
                  _hover={{ backgroundColor: page === ItteratePage ? 'gray.200' : 'gray.600' }}>
            {ItteratePage}
          </Button>
        ))}

        <Button backgroundColor={'white'}
                borderColor={'gray.300'}
                textColor={'gray.700'}
                borderRadius={4} size={'sm'} borderWidth={1}
                onClick={() => {
                  if (page < endPage) {
                    dispatch(setPage(page + 1));
                  } else {
                    dispatch(setPage(endPage));
                  }
                }}>
          <ChevronLeftIcon />
        </Button>
      </ButtonGroup>
    );
  } else {
    return <></>;
  }
};

export const getCartStatus = (status) => {
  switch (status) {
    case 'CRAT':
      return 'ثبت شده';
    case 'PENP':
      return 'در انتظار پرداخت';
    case 'PAID':
      return 'پرداخت شده';
    case 'PROC':
      return 'ارسال شده';
    case 'DELV':
      return 'تحویل شده';
    case 'CANC':
      return 'کنسل شده';
  }
};

export const ShowGLB = ({ image, autoRotate }) => {
  return (
    <Canvas shadows camera={{ position: [0, 0.2, 0.4] }}>
      <Environment preset='forest' />
      <Show3DGLB source={image} />
      <OrbitControls autoRotate={autoRotate} />
    </Canvas>
  );
};

export const createOrderIdPay = (order_id, totalPrice, navigate) => {
  fetchWithAxios.get('/getcustomerinfo', {})
    .then((userInfoResponse) => {
      axios.post('https://sandbox.banktest.ir/saman/sep.shaparak.ir/OnlinePG/OnlinePG',
        {
          'action': 'token',
          'TerminalId': '134754750',
          'Amount': parseInt(totalPrice) * 10,
          'ResNum': order_id.toString(),
          'RedirectUrl': frontendURL + '/checkpay',
          'CellNumber': userInfoResponse.phone_number,
        },
        {
          auth: {
            username: 'user134754749', // Username
            password: '38531349', // Password
          },
        })
        .then((response) => {
          navigate(`https://sep.shaparak.ir/OnlinePG/SendToken?token=${response.data.token}&GetMethod=true`, { replace: true });
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const createOrder = (totalPrice, navigate) => {
  fetchWithAxios.get('/delivery/createorder/', {})
    .then((response) => {
      createOrderIdPay(response.data.order_id, totalPrice, navigate);
    })
    .catch((e) => {
      showToast('خطا', e.message);
    });
};
