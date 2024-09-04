import { requiredMessage } from 'validation'
import * as yup from 'yup'

export const CHARACTER_SETTINGS_SCHEMA_CREATE = yup.object().shape({
  name: yup.string().trim().max(20, 'Max 20 characters').required(requiredMessage),
  prompt: yup.string().trim().max(1000, 'Max 1000 characters').required(requiredMessage),
  image: yup
    .mixed()
    .test('fileSize', requiredMessage, (value) => {
      return !!value
    })
    .test('fileSize', 'File size must be less 5 MB', (value) => {
      if (!value) return false
      return value instanceof File ? value.size <= 5000000 : false
    })
    .test('fileType', 'Format must be jpeg, jpg or png', (value) => {
      if (!value) return false
      return value instanceof File
        ? ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type)
        : false
    }),
  audio: yup
    .mixed()
    .test('fileSize', requiredMessage, (value) => {
      return !!value
    })
    .test('fileSize', 'File size must be less 5 MB', (value) => {
      if (!value) return false
      return value instanceof File ? value.size <= 5000000 : false
    })
    .test('fileType', 'Format must be mpeg, wav or mp3', (value) => {
      if (!value) return false
      return value instanceof File
        ? ['audio/mpeg', 'audio/wav', 'audio/mp3'].includes(value.type)
        : false
    }),
  textChatType: yup.object().shape({
    value: yup.string().trim().required(requiredMessage),
    name: yup.string().trim().required(requiredMessage),
  }),
  speechChatType: yup.object().shape({
    value: yup.string().trim(),
    name: yup.string().trim(),
  }),
  videoChatType: yup
    .object()
    .shape({
      value: yup.string().trim(),
      name: yup.string().trim(),
    })
    .when('speechChatType', (speechChatType, schema) => {
      return schema.transform((v) => speechChatType[0].value === '' ? { value: '', name: '' } : v)
    }),
})

export const CHARACTER_SETTINGS_SCHEMA_EDIT = yup.object().shape({
  name: yup.string().trim().max(20, 'Max 20 characters').required(requiredMessage),
  prompt: yup.string().trim().max(1000, 'Max 1000 characters').required(requiredMessage),
  image: yup
    .mixed()
    .test('fileSize', 'File size must be less 5 MB', (value) => {
      if (!value) return true
      return value instanceof File ? value.size <= 5000000 : false
    })
    .test('fileType', 'Format must be jpeg, jpg or png', (value) => {
      if (!value) return true
      return value instanceof File
        ? ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type)
        : false
    }),
  audio: yup
    .mixed()
    .test('fileSize', 'File size must be less 5 MB', (value) => {
      if (!value) return true
      return value instanceof File ? value.size <= 5000000 : false
    })
    .test('fileType', 'Format must be mpeg, wav or mp3', (value) => {
      if (!value) return true
      return value instanceof File
        ? ['audio/mpeg', 'audio/wav', 'audio/mp3'].includes(value.type)
        : false
    }),
  textChatType: yup.object().shape({
    value: yup.string().trim().required(requiredMessage),
    name: yup.string().trim().required(requiredMessage),
  }),
  speechChatType: yup.object().shape({
    value: yup.string().trim(),
    name: yup.string().trim(),
  }),
  videoChatType: yup
    .object()
    .shape({
      value: yup.string().trim(),
      name: yup.string().trim(),
    })
    .when('speechChatType', (speechChatType, schema) => {
      return schema.transform((v) => speechChatType[0].value === '' ? { value: '', name: '' } : v)
    }),
})
