import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import MainLayout from '../components/main-layout'
import { AppDispatch, RootState } from '../store'
import { login } from '../store/reducers/userReducer'
import NotAuth from './NotAuth'
import ChatPage from './chats'
import { Error } from './error'
import MainPage from './main'
import { NotFound } from './not-found'
import Root from './root'

const AppRouter = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { isAuth, token } = useSelector((state: RootState) => state.user)
  useEffect(() => {
    dispatch(login())
  }, [isAuth])
  return (
    <Routes>
      {isAuth && token ? (
        <Route path="/" element={<Root />} errorElement={<Error />}>
          <Route element={<MainLayout />}>
            <Route index element={<MainPage />} />
            <Route path="chat/:chatId" element={<ChatPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      ) : (
        <Route path="*" element={<NotAuth/>} />
      )}
    </Routes>
  )
}

export default AppRouter
