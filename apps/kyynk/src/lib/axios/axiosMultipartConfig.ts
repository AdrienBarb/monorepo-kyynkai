import axios from 'axios';
import { redirect } from 'next/navigation';
import { useErrorStore } from '@/stores/ErrorStore';

const isServer = typeof window === 'undefined';

const axiosInstanceMultipartForm = axios.create({
  baseURL: isServer
    ? process.env.NEXT_PUBLIC_INTERNAL_API_URL
    : process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

axiosInstanceMultipartForm.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const errorStatus = error?.response?.status;
    const setStatusCode = useErrorStore.getState().setStatusCode;
    const setErrorMessage = useErrorStore.getState().setErrorMessage;

    if (errorStatus === 404) {
      if (isServer) {
        redirect('/404');
      } else {
        setStatusCode(errorStatus);
      }

      return Promise.reject(error.response?.data || 'Not found');
    }

    if (errorStatus >= 500) {
      let message = error.response?.data || 'Server error';
      if (isServer) {
        redirect('/500');
      } else {
        setErrorMessage(message);
        setStatusCode(errorStatus);
      }
      return Promise.reject(message);
    }

    if (errorStatus === 400) {
      let message = error.response?.data || 'Bad request';

      if (isServer) {
        redirect('/500');
      } else {
        setErrorMessage(message);
        setStatusCode(errorStatus);
      }

      return Promise.reject(message);
    }

    if (errorStatus === 401) {
      let message = error.response?.data || 'Need to login';
      if (isServer) {
        redirect('/401');
      } else {
        setStatusCode(errorStatus);
        setErrorMessage(message);
      }
      return Promise.reject(message);
    }

    return Promise.reject(error.response?.data || 'Something went wrong');
  },
);

export default axiosInstanceMultipartForm;
