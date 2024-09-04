import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'

import MainLayout from '../components/main-layout'
import ChatPage from './chats'
import { Error } from './error'
import MainPage from './main'
import { NotFound } from './not-found'
import Root from './root'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<Error />}>
      <Route element={<MainLayout />}>
        <Route index element={<MainPage />} />
        <Route path="/chat/:chatId" element={<ChatPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Route>
  )
)

export default router
