import axios from 'axios';

export const axiosAdminClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_ADMIN_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const axiosClient = axios.create({
  baseURL: import.meta.env.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
