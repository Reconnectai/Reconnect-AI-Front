import axios, { AxiosRequestHeaders } from 'axios'
import { store } from 'store'
import { login } from 'store/reducers/userReducer'

export const baseURL = process.env.REACT_APP_API_URL

export const axiosApi = axios.create({
  baseURL,
  withCredentials: true,
})

const prepareHeaders = async (headers: AxiosRequestHeaders) => {
  const token = localStorage.getItem('token_aptos')
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  return headers
}

axiosApi.interceptors.request.use(
  async (config) => {
    config.headers = await prepareHeaders(config.headers)
    return config
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  },
)

axiosApi.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        localStorage.removeItem('token_aptos')
        await store.dispatch(login())
        originalRequest.headers = await prepareHeaders(originalRequest.headers)
        return axiosApi(originalRequest)
      } catch (refreshError) {
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  },
)