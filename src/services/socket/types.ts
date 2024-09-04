export interface ISocketMessage {
  audio_answer: string | null
  audio_answered_at: string | null
  content: string
  voice_content: string | null
  created_at: string
  error: string | null
  id: string
  message_type: 'text' | 'audio' | 'video',
  text_answer: string | null
  text_answered_at: string | null
  video_answer: string | null
  video_answered_at: string | null
}

export interface IException {
  exception:string
}


