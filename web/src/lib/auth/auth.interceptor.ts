import { AxiosInstance } from 'axios';

const AuthInterceptor = (
  api: AxiosInstance,
  logout: () => void,
  refresh: () => Promise<void>
) => {
  let isRefreshing = false;
  let failedQueue: Array<object> = [];

  const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom: any) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });
    failedQueue = [];
  };

  api.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise(function (resolve, reject) {
            failedQueue.push({ resolve, reject });
          })
            .then(token => {
              originalRequest.headers['Authorization'] = 'Bearer ' + token;
              return api(originalRequest);
            })
            .catch(err => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        return new Promise((resolve, reject) => {
          refresh()
            .then((token : any) => {
              api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
              originalRequest.headers['Authorization'] = 'Bearer ' + token;
              processQueue(null, token);
              resolve(api(originalRequest));
            })
            .catch(err => {
              processQueue(err, null);
              logout();
              reject(err);
            })
            .finally(() => {
              isRefreshing = false;
            });
        });
      }

      return Promise.reject(error);
    }
  );
};

export default AuthInterceptor;
