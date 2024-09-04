export interface IMessage {
  audioAnswer: string | null
  audioAnsweredAt: string | null
  content: string
  voiceContent: string | null
  createdAt: string
  error: string | null
  id: string
  messageType: 'text' | 'audio' | 'video'
  textAnswer: string | null
  textAnsweredAt: string | null
  videoAnswer: string | null
  videoAnsweredAt: string | null
}

export interface IHistoryResponse {
  content: IMessage[] | string
  totalElements: number
  totalPages: number
}

export interface IHistoryPaging {
  page?: number
  pageSize?: number
  chatId: string
  toDatetime?: string
}
