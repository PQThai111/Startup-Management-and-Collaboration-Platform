// import axios, { AxiosError, type AxiosInstance } from 'axios'
import axios, { type AxiosInstance } from 'axios'
// import { AuthResponse } from 'src/types/auth.type'
// import {
//   clearLS,
//   getAccessTokenToLS,
//   getRefreshTokenToLS,
//   saveAccessTokenAndRefreshTokenToLS,
//   setProfileToLS
// } from './auth'

import config from '../constant/config'

class Http {
  instance: AxiosInstance
  // private accessToken: string
  // private refreshToken: string
  constructor() {
    // this.accessToken = getAccessTokenToLS()
    // this.refreshToken = getRefreshTokenToLS()
    this.instance = axios.create({
      baseURL: `${config.baseURL}`,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
    // this.instance.interceptors.request.use(
    //   (config) => {
    //     if (this.accessToken && config.headers) {
    //       config.headers.Authorization = Bearer ${this.accessToken}
    //       return config
    //     }
    //     return config
    //   },
    //   (error) => {
    //     return Promise.reject(error)
    //   }
    // )
    // // Add a response interceptor

//   }
// }

const http = new Http().instance

export default http
