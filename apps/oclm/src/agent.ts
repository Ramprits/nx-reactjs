/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosResponse } from 'axios';
import { createBrowserHistory } from 'history';
import { store } from './main';

const history = createBrowserHistory();
axios.defaults.baseURL =
  process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

axios.interceptors.request.use((config: any) => {
  const { auth } = store.getState();
  console.log(`auth`, auth);
  const token = '';
  if (token && config) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config, headers } = error.response!;
    switch (status) {
      case 400:
        // eslint-disable-next-line no-prototype-builtins
        if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
          history.push('/not-found');
        }
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          // throw modalStateErrors.flat();
        } else {
          console.error(data);
        }
        break;
      case 401:
        if (
          status === 401 &&
          headers['www-authenticate']?.startsWith(
            'Bearer error="invalid_token"'
          )
        ) {
          // store.userStore.logout();
          console.error('Session expired - please login again');
        }
        break;
      case 404:
        history.push('/not-found');
        break;
      case 500:
        // store.commonStore.setServerError(data);
        history.push('/server-error');
        break;
    }
    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

// const Activities = {
//   list: (params: URLSearchParams) =>
//     axios
//       .get<PaginatedResult<Activity[]>>('/activities', { params })
//       .then(responseBody),
//   details: (id: string) => requests.get<Activity>(`/activities/${id}`),
//   create: (activity: ActivityFormValues) =>
//     requests.post<void>('/activities', activity),
//   update: (activity: ActivityFormValues) =>
//     requests.put<void>(`/activities/${activity.id}`, activity),
//   delete: (id: string) => requests.del<void>(`/activities/${id}`),
//   attend: (id: string) => requests.post<void>(`/activities/${id}/attend`, {}),
// };

const Product = {
  list: (params: any) => axios.get('/products', { params }),
  details: (id: string) => requests.get<any>(`/products/${id}`),
};
const agent = {
  Product,
};

export default agent;
