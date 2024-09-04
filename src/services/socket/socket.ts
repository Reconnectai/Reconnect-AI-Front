import { baseURL } from 'api'
import { connect, Socket } from 'socket.io-client'

export const createSocketMessageConnection = (chatId: string): Socket => {
  return connect(
    `${baseURL}/message`,
    {
      forceNew: true,
      path: '/ws/socket.io',
      transports: ['websocket'],
      query: { chat_id: chatId },
    }
  )
}

export const createSocketChatConnection = (chatId: string): Socket => {
  return connect(
    `${baseURL}/chat`,
    {
      forceNew: true,
      path: '/ws/socket.io',
      transports: ['websocket'],
      query: { chat_id: chatId },
    }
  )
}
