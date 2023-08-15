import axios from 'axios';
import { createStandaloneToast } from '@chakra-ui/react';
import Cookies from 'universal-cookie';

export const backendURL = 'http://localhost:8000';

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
