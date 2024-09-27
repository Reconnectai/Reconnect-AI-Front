import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react'
import { AxiosError, AxiosRequestConfig } from 'axios'
import applyCaseMiddleware from 'axios-case-converter'

import { axiosApi } from './index'

export const tagTypes = ['Characters', 'Messages','Balance']

const axiosApiWithCaseConverter = applyCaseMiddleware(axiosApi, {
  ignoreHeaders: true,
})

const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string
      method: AxiosRequestConfig['method']
      data?: AxiosRequestConfig['data']
      params?: AxiosRequestConfig['params']
    },
    unknown,
    unknown
  > =>
  async (params) => {
    try {
      const result = await axiosApiWithCaseConverter(params)
      return { data: result.data }
    } catch (axiosError) {
      let err = axiosError as AxiosError
      console.log('err: ', err)
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      }
    }
  }

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
  tagTypes,
})
