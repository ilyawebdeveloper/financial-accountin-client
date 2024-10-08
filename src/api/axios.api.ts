import axios from 'axios';
import { getTokenFromLocalStorage } from '../helpers/localStorage.helper';

const defaultUrl = import.meta.env.VITE_API_URL;

export const instant = axios.create({
  baseURL: defaultUrl,
  headers: {
    Authorization: `Bearer ${getTokenFromLocalStorage()}`,
  },
});
