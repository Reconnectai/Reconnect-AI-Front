export interface Character {
  id: number
  name: string
  image: string
  createdAt: string
  textDeployedAt: string | null
  audioDeployedAt: string | null
  error: string | null
}

export interface GetCharacters {
  content: Character[]
  totalElements: number,
  totalPages: number
}


export interface CharacterCreate {
  formData: FormData
}

export interface AutocompleteOption {
  name: string
  value: string
}

export interface CharacterSettings {
  id: number
  name: string
  image: string
  createdAt: string
  textDeployedAt: string | null
  audioDeployedAt: string | null
  audio: string
  textChatType: string
  speechChatType?: string
  videoChatType?: string
  error?: string | null
  prompt:string
}

export interface CharacterUpdateData {
  id: number
  name?: string
  textChatType?: string
  speechChatType?: string
  videoChatType?: string
  prompt?:string
}

export interface CharacterUpdateMedia {
  id: number
  formData: FormData
}

export enum textChatType {
  'Llama 3' = 'llama_3',
  'ChatGPT 4o' = 'chatgpt_4o',
}

export enum speechChatType {
  'XTTS v2' = 'xtts_v2',
}

export enum videoChatType {
  'SadTalker v2' = 'sad_talker_v2',
}

export const TEXT_CHAT_OPTIONS = Object.entries(textChatType).map(([name, value]) => ({
  name,
  value,
}))
export const SPEECH_CHAT_OPTIONS = Object.entries(speechChatType).map(([name, value]) => ({
  name,
  value,
}))
export const VIDEO_CHAT_OPTIONS = Object.entries(videoChatType).map(([name, value]) => ({
  name,
  value,
}))

export enum MessageType {
  TEXT = 'text',
  VOICE = 'audio',
  VIDEO = 'video',
}
