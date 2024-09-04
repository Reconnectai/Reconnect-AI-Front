import { baseApi } from 'api/api'

import {
  Character,
  CharacterCreate,
  CharacterSettings,
  CharacterUpdateData,
  CharacterUpdateMedia,
  GetCharacters,
} from './types'

const charactersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCharacters: build.query<GetCharacters, { page: number; pageSize: number,query?:string }>({
      query: ({ page, pageSize,query }) => ({
        url: `/character?page=${page}&page_size=${pageSize}&query=${query}`,
        method: 'GET',
      }),
      providesTags: () => [{ type: 'Characters', id: 'CHARACTERS' }],
    }),
    getCharacter: build.query<CharacterSettings, { characterId: string }>({
      query: (body) => ({
        url: `/character/${body.characterId}`,
        method: 'GET',
      }),
      providesTags: () => [{ type: 'Characters', id: 'CHARACTERS' }],
    }),
    createCharacter: build.mutation<Character, CharacterCreate>({
      query: ({ formData }) => ({
        url: '/character',
        method: 'POST',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
      invalidatesTags: [{ type: 'Characters', id: 'CHARACTERS' }],
    }),
    editCharacterData: build.mutation<string, CharacterUpdateData>({
      query: ({ id, ...rest }) => ({
        url: `/character/${id}`,
        method: 'PATCH',
        data: rest,
      }),
      invalidatesTags: [{ type: 'Characters', id: 'CHARACTERS' }],
    }),
    editCharacterMedia: build.mutation<string, CharacterUpdateMedia>({
      query: ({ id, formData }) => ({
        url: `/character/media/${id}`,
        method: 'POST',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
      invalidatesTags: [{ type: 'Characters', id: 'CHARACTERS' }],
    }),
    regenerateCharacter: build.mutation<CharacterCreate, { characterId: number }>({
      query: ({ characterId }) => ({
        url: `/character/${characterId}`,
        method: 'POST',
      }),
      invalidatesTags: [{ type: 'Characters', id: 'CHARACTERS' }],
    }),
  }),
})
export const {
  useGetCharactersQuery,
  useGetCharacterQuery,
  useCreateCharacterMutation,
  useEditCharacterDataMutation,
  useEditCharacterMediaMutation,
  useRegenerateCharacterMutation,
} = charactersApi
