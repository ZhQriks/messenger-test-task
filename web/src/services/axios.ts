import { BACKEND_URL } from '@/shared';
import axios, { AxiosInstance } from 'axios';

const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    }
  });

  instance.interceptors.request.use(config => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser) {
        const { accessToken, csrfToken } = parsedUser;
        if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
        if (csrfToken) config.headers["X-CSRFToken"] = csrfToken;
      }
    }
    return config;
  });

  return instance;
};

export const backendApiInstance = createAxiosInstance();
