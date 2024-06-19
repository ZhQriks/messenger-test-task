import axios, { AxiosInstance } from 'axios';
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const backendApiInstance = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  }
})

export const authorizedBackendApiInstance = ((): AxiosInstance => {
  const instance = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    }
  })

  instance.interceptors.response.use(
    response => response,
    error => Promise.reject(error)
  );
  instance.interceptors.request.use(config => {

    const user = localStorage.getItem('user');

    if (user) {
      const parsedUser = JSON.parse(user);
      const { accessToken, csrfToken } = parsedUser;

      config.headers.Authorization = `Bearer ${accessToken}`;
      config.headers["X-CSRFToken"] = csrfToken;
    }

    return config
  })

  return instance
})();
