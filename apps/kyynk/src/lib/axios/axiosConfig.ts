import axios from 'axios';
import { redirect } from 'next/navigation';
import { useErrorStore } from '@/stores/ErrorStore';

const isServer = typeof window === 'undefined';

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const errorStatus = error?.response?.status;
    const setStatusCode = useErrorStore.getState().setStatusCode;
    const setErrorMessage = useErrorStore.getState().setErrorMessage;
    const setIsError = useErrorStore.getState().setIsError;

    if (errorStatus === 404) {
      let message = error.response?.data?.message || 'Server error';

      if (isServer) {
        redirect('/404');
      } else {
        setStatusCode(errorStatus);
        setErrorMessage(message);
        setIsError(true);
      }

      return Promise.reject(message);
    }

    if (errorStatus >= 500) {
      let message = error.response?.data?.message || 'Server error';
      if (isServer) {
        redirect('/500');
      } else {
        setErrorMessage(message);
        setStatusCode(errorStatus);
        setIsError(true);
      }
      return Promise.reject(message);
    }

    if (errorStatus === 400) {
      let message = error.response?.data?.message || 'Bad request';

      if (isServer) {
        redirect('/500');
      } else {
        setErrorMessage(message);
        setStatusCode(errorStatus);
        setIsError(true);
      }

      return Promise.reject(message);
    }

    if (errorStatus === 401) {
      let message = error.response?.data?.message || 'Need to login';
      if (isServer) {
        redirect('/401');
      } else {
        setStatusCode(errorStatus);
        setErrorMessage(message);
        setIsError(true);
      }
      return Promise.reject(message);
    }

    return Promise.reject(
      error.response?.data?.message || 'Something went wrong',
    );
  },
);

axiosInstance.interceptors.request.use(async (config) => {
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  }

  return config;
});

export default axiosInstance;
