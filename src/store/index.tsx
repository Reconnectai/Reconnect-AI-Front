import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { baseApi } from 'api/api'
import { errorLogger } from 'api/middlewareApi'
import {userReducer} from "./reducers/userReducer";
import {characterListReducer} from "./reducers/characterListReducer";

const rootReducer = combineReducers({
  user:userReducer,
  characterList:characterListReducer,
  [baseApi.reducerPath]: baseApi.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(baseApi.middleware, errorLogger),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof rootReducer>
export type RootReducerType = typeof rootReducer
export type AppRootStateType = ReturnType<RootReducerType>
export type AppDispatch = typeof store.dispatch
