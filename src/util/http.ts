// import axios, { AxiosError, type AxiosInstance } from 'axios'
import axios, { AxiosError, type AxiosInstance } from 'axios';
import config from '../constant/config';
// import { AuthResponse } from '../types/auth.type'
import {
  clearLS,
  getAccessTokenToLS,
  getRefreshTokenToLS,
  saveAccessTokenAndRefreshTokenToLS,
  setProfileToLS,
} from './auth';
import { HttpStatusCode } from '../constant/httpStatusCode.enum';
import { AuthResponse } from '../types/auth.type';

class Http {
  instance: AxiosInstance;
  private accessToken: string;
  private refreshToken: string;
  constructor() {
    this.accessToken = getAccessTokenToLS();
    this.refreshToken = getRefreshTokenToLS();
    this.instance = axios.create({
      baseURL: `${config.baseURL}`,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.Authorization = `Bearer ${this.accessToken}`;
          return config;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
    // Add a response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config;
        if (`${url?.split('/')[1]}` === 'login') {
          this.accessToken = response.data.data.access_token;
          this.refreshToken = response.data.data.refresh_token;
          saveAccessTokenAndRefreshTokenToLS(
            this.accessToken,
            this.refreshToken,
          );
          setProfileToLS((response.data.data as AuthResponse).user);
        }
        // else if (url === path.logout) {
        //   this.accessToken = ''
        //   this.refreshToken = ''
        //   clearLS()
        // }
        return response;
      },
      (error: AxiosError) => {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          // const data: any | undefined = error.response?.data
          // const message = data?.message || error.message
        }
        if (error.response?.status === HttpStatusCode.Unauthorized) {
          clearLS();
          // window.location.reload()
        }
        return Promise.reject(error);
      },
    );
  }
}

const http = new Http().instance;

export default http;
