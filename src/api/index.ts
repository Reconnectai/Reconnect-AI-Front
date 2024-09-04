import axios from 'axios'

export const baseURL = process.env.REACT_APP_API_URL

export const axiosApi = axios.create({
  baseURL,
  withCredentials: true,
})

