import { baseURL } from 'api'
import { connect, Socket } from 'socket.io-client'
const token =  localStorage.getItem('token_aptos')
export const createSocketMessageConnection = async (chatId: string): Promise<Socket> => {
  return connect(
    `${baseURL}/message`,
    {
      forceNew: true,
      path: '/ws/socket.io',
      transports: ['websocket'],
      query: { chat_id: chatId },
      auth: { token },

    }
  );
};

export const createSocketChatConnection = async (chatId: string): Promise<Socket> => {
  return connect(
    `${baseURL}/chat`,
    {
      forceNew: true,
      path: '/ws/socket.io',
      transports: ['websocket'],
      query: { chat_id: chatId },
      auth: { token },

    }
  );
};