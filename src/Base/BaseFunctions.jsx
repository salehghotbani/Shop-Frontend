import axios from 'axios';
import { createStandaloneToast } from '@chakra-ui/react';
import Cookies from 'universal-cookie';
import CreatableSelect from 'react-select/creatable';
import React from 'react';

export const backendURL = 'http://backend.ghotbani.ir';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

export const fetchWithAxios = axios.create({
  baseURL: backendURL,
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

export const MultiSelect = ({ dispatch, multiValueBackColor, multiValueRemoveBackColor, setReduxMethod }) => {
  return (
    <CreatableSelect isMulti
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
                       dispatch(setReduxMethod(event));
                     }}
    />
  );
};
