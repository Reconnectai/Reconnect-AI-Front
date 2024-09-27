import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

declare global {
  interface Window {
    aptos: any
  }
}
const URL: string = process.env.REACT_APP_AUTH_URL as string

async function getToken() {
  try {
    const { publicKey: public_key } = await window.aptos.connect()
    const signedMessage = await window.aptos.signMessage({
      message: 'Get token',
    })
    const { fullMessage: full_message, signature } = signedMessage
    const { data: token } = await axios.post(URL, {
      public_key,
      full_message,
      signature,
    })
    localStorage.setItem('token_aptos', token)
    return token
  } catch (error) {
    console.error('Error during connection or signing:', error)
    return null
  }
}


export const login = createAsyncThunk('user/login', async (_, { rejectWithValue }) => {
  try {
    if (window.aptos) {
      if (!localStorage.getItem('token_aptos')) {
        const { address } = await window.aptos.connect()
        const token = await getToken()
        return [token, address]
      } else if (localStorage.getItem('token_aptos')) {
        const { address } = await window.aptos.connect()
        return [localStorage.getItem('token_aptos'), address]
      }
    } else {
      throw new Error('Petra Wallet is not available')
    }
  } catch (error) {
    return rejectWithValue('login reject')
  }
})

export const logout = createAsyncThunk('user/logout', async () => {
  if (window.aptos) {
    await window.aptos.disconnect()
    localStorage.removeItem('token_aptos')
    return null
  }
  throw new Error('Petra Wallet is not available')
})

const userSlice = createSlice({
  name: 'user',
  initialState: {
    firstName: 'J',
    lastName: 'W',
    address: '',
    token: '',
    avatar: '',
    isAuth: false,
    loading: false,
    error: null,
    check: false,
  } as InitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.isAuth = true
        state.error = null
        state.check = true
        state.address = action?.payload?.[1]
        state.token = action?.payload?.[0]
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to login'
        state.isAuth = false
        state.check = true
      })
      .addCase(logout.pending, (state) => {
        state.loading = true
        state.error = null
        state.check = false
        state.address = ''
        state.token = ''
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false
        state.isAuth = false
        state.error = null
        state.check = false
        state.address = ''
        state.token = ''
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to logout'
        state.check = false
        state.address = ''
        state.token = ''
      })
  },
})

export const userReducer = userSlice.reducer

type InitialState = {
  firstName: string
  lastName: string
  address: string | undefined
  avatar: string
  isAuth: boolean
  loading: boolean
  error: null | string
  check: boolean
  token: string | undefined
}
