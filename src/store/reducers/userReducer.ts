import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    firstName: 'Johnnie',
    lastName: 'Williams',
    avatar: '',
  } as InitialState,
  reducers: {
     },
})

export const userReducer = userSlice.reducer

type InitialState = {
  firstName: string
  lastName: string
  avatar: string
}

