import { isRejectedWithValue, type Middleware } from '@reduxjs/toolkit'

const serverErrorToString = (error: any): string =>
  error?.data?.msg ? error.data.msg : 'Something went wrong'

export const errorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    console.log(serverErrorToString(action?.payload || 'Error'), 'error')
  }
  return next(action)
}
