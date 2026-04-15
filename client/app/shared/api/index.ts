import axios from 'axios';
import { type InternalAxiosRequestConfig } from 'axios';

const $host = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_API,
});

const $authHost = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_API,
});
const authInterceptor = (config: InternalAxiosRequestConfig) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;

  return config;
};

$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };
