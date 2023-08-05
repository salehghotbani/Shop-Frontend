import axios from 'axios';

export const fetchWithAxios = axios.create({
  baseURL: 'http://localhost:8000',
});
