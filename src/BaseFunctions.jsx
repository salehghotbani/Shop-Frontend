import axios from 'axios';
import { createStandaloneToast } from '@chakra-ui/react';
import Cookies from 'universal-cookie';

export const cookies = new Cookies();

export const fetchWithAxios = axios.create({
  baseURL: 'http://192.27.5.10:8000',
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
