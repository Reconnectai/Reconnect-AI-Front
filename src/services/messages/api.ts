import { baseApi } from 'api/api'

import { IHistoryPaging, IHistoryResponse, IMessage } from './types'

const charactersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getHistory: build.query<IHistoryResponse, IHistoryPaging>({
      query: ({ page, pageSize, chatId, toDatetime }) => ({
        url: toDatetime
          ? `/message?chat_id=${chatId}&page=${page}&page_size=${pageSize}&to_datetime=${toDatetime}`
          : `/message?chat_id=${chatId}&page=${page}&page_size=${pageSize}`,
        method: 'GET',
      }),
      providesTags: () => [{ type: 'History', id: 'HISTORY' }],
    }),
    createNewMessage: build.mutation<IMessage, { formData: FormData }>({
      query: ({ formData }) => ({
        url: '/message',
        method: 'POST',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
      invalidatesTags: [{ type: 'Messages', id: 'MESSAGES' }],
    }),
    regenerateMessage: build.mutation<IMessage, { messageId: string }>({
      query: ({ messageId }) => ({
        url: `/message/${messageId}`,
        method: 'POST',
      }),
      invalidatesTags: [{ type: 'CreateMessage', id: 'CREATE_MESSAGE' }],
    }),
  }),
})
export const { useGetHistoryQuery, useCreateNewMessageMutation, useRegenerateMessageMutation } =
  charactersApi
