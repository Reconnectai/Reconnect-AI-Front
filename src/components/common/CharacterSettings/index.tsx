import { yupResolver } from '@hookform/resolvers/yup'
import { enqueueSnackbar } from 'notistack'
import React, { FC, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  useCreateCharacterMutation,
  useEditCharacterMediaMutation,
  useEditCharacterDataMutation,
} from 'services/characters/api'
import {
  AutocompleteOption,
  CharacterSettings,
  SPEECH_CHAT_OPTIONS,
  TEXT_CHAT_OPTIONS,
  VIDEO_CHAT_OPTIONS,
} from 'services/characters/types'
import { AppDispatch } from 'store'
import { setCharacterListQuery } from 'store/reducers/characterListReducer'

import { Box, useTheme } from '@mui/material'

import TextInputControlled from 'components/common/TextInput/TextInputControlled'

import { CustomButton } from '../Button'
import ConfirmDeleteModal from '../ConfirmModal'
import ControlledFileSelection from '../ControlledFileSelection'
import ControlledSelectAutocomplete from '../ControlledSelectAutocomplete'
import CreatingCharacterLoader from '../CreatingCharacterLoader'
import CropAvatar from '../CropAvatar'
import CharacterSettingsAppBar from './CharacterSettingsAppBar'
import RenderAudio from './RenderMedia/RenderAudio'
import RenderImage from './RenderMedia/RenderImage'
import { CHARACTER_SETTINGS_SCHEMA_CREATE, CHARACTER_SETTINGS_SCHEMA_EDIT } from './validation'

interface FormValues {
  name: string
  image?: any
  audio?: any
  textChatType: AutocompleteOption
  speechChatType: {
    name?: string
    value?: string
  }
  videoChatType: {
    name?: string
    value?: string
  }
  prompt: string
}

interface IProps {
  setOpenCharacterSettingsDrawer: React.Dispatch<React.SetStateAction<boolean>>
  currentCharacter?: CharacterSettings
  isFullOpen?: boolean
  setGoToEnd?: React.Dispatch<React.SetStateAction<boolean>>
}

export const acceptAudioFormats = [
  'audio/mpeg',
  'audio/mp3',
  'audio/wav',
  'audio/x-wav',
  'audio/wave',
  'audio/x-pn-wav',
  'audio/vnd.wave',
  'audio/ogg',
  'audio/vorbis',
  'application/ogg',
  'audio/opus',
  'audio/flac',
  'audio/x-flac',
  'audio/mp4',
  'audio/x-m4a',
  'audio/aac',
  'audio/aac',
  'audio/x-aac',
  'audio/x-ms-wma',
  'audio/amr',
  'audio/amr-wb',
  'audio/aiff',
  'audio/x-aiff',
  'audio/mpeg',
  'audio/x-mpeg',
  'audio/mp2',
  'audio/midi',
  'audio/x-midi',
  'audio/3gpp',
  'audio/3gpp2',
  'audio/webm',
]
const CharacterSettingPage: FC<IProps> = ({
  setOpenCharacterSettingsDrawer,
  currentCharacter,
  isFullOpen,
  setGoToEnd,
}) => {
  const dispatch: AppDispatch = useDispatch()
  const theme = useTheme()
  const [avatarUrl, setAvatarUrl] = useState<string | null>(currentCharacter?.image || null)
  const [audioUrl, setAudioUrl] = useState<string | null>(currentCharacter?.audio || null)
  const [openCropDialog, setOpenCropDialog] = useState<boolean>(false)
  const avatarRef = useRef<HTMLInputElement>(null)
  const voiceRef = useRef<HTMLInputElement>(null)
  const [deleteCharacterModal, setDeleteCharacterModal] = useState<boolean>(false)
  const [createCharacter, { isLoading: isCreateCharacter }] = useCreateCharacterMutation()
  const [editCharacterMedia, { isLoading: isEditCharacterMedia }] = useEditCharacterMediaMutation()
  const [editCharacterData, { isLoading: isEditCharacterData }] = useEditCharacterDataMutation()
  const navigate = useNavigate()
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
  } = useForm<FormValues>({
    resolver: yupResolver(
      currentCharacter ? CHARACTER_SETTINGS_SCHEMA_EDIT : CHARACTER_SETTINGS_SCHEMA_CREATE
    ),
    mode: 'onBlur',
    defaultValues: {
      name: currentCharacter?.name || '',
      image: '',
      audio: '',
      textChatType: {
        value: currentCharacter?.textChatType || '',
        name: TEXT_CHAT_OPTIONS.find((v) => v.value === currentCharacter?.textChatType)?.name || '',
      },
      speechChatType: {
        value: currentCharacter?.speechChatType || '',
        name:
          SPEECH_CHAT_OPTIONS.find((v) => v.value === currentCharacter?.speechChatType)?.name || '',
      },
      videoChatType: {
        value: currentCharacter?.videoChatType || '',
        name:
          VIDEO_CHAT_OPTIONS.find((v) => v.value === currentCharacter?.videoChatType)?.name || '',
      },
      prompt: currentCharacter?.prompt || '',
    },
  })
  const onSubmit = async (data: FormValues) => {
    setGoToEnd && setGoToEnd(true)
    if (currentCharacter) {
      const { image, audio, id, createdAt, ...currentCompare } = currentCharacter
      const dataCompare = {
        name: data.name,
        textChatType: data.textChatType.value,
        speechChatType: data.speechChatType?.value || null,
        videoChatType: data.videoChatType?.value || null,
        prompt: data.prompt,
      }
      if (data.image || data.audio) {
        const formData = new FormData()
        data.image && formData.append('image_file', data.image)
        data.audio && formData.append('audio_file', data.audio)
        dispatch(setCharacterListQuery(false))
        editCharacterMedia({
          id: currentCharacter.id,
          formData,
        })
          .unwrap()
          .then(() => {
            setOpenCharacterSettingsDrawer(false)
            enqueueSnackbar('The character has been updated', {
              variant: 'success',
              autoHideDuration: 3000,
            })
          })
          .catch(() => {
            enqueueSnackbar('Something went wrong. Try again later', {
              variant: 'error',
              autoHideDuration: 3000,
            })
            console.log('Error. Try again later')
          })
      } else if (JSON.stringify(currentCompare) !== JSON.stringify(dataCompare)) {
        dispatch(setCharacterListQuery(false))
        editCharacterData({
          id: currentCharacter.id,
          name: data.name || '',
          textChatType: data.textChatType?.value || '',
          ...(data.speechChatType?.value ? { speechChatType: data.speechChatType?.value } : {}),
          ...(data.videoChatType?.value ? { videoChatType: data.videoChatType?.value } : {}),
          prompt: data.prompt,
        })
          .unwrap()
          .then(() => {
            setOpenCharacterSettingsDrawer(false)
            enqueueSnackbar('The character has been updated', {
              variant: 'success',
              autoHideDuration: 3000,
            })
          })
          .catch(() => {
            enqueueSnackbar('Something went wrong. Try again later', {
              variant: 'error',
              autoHideDuration: 3000,
            })
            console.log('Error. Try again later')
          })
      } else {
        setOpenCharacterSettingsDrawer(false)
      }
    } else {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('prompt', data.prompt)
      formData.append('image', data.image)
      formData.append('audio', data.audio)
      formData.append('textChatType', data.textChatType.value)
      data.speechChatType?.value &&
        formData.append('speechChatType', data.speechChatType?.value || '')
      data.videoChatType?.value && formData.append('videoChatType', data.videoChatType?.value || '')
      dispatch(setCharacterListQuery(false))
      createCharacter({
        formData,
      })
        .unwrap()
        .then((data) => {
          setOpenCharacterSettingsDrawer(false)
          enqueueSnackbar('The character was created', {
            variant: 'success',
            autoHideDuration: 3000,
          })
          navigate(`/chat/${data.id}`)
        })
        .catch(() => {
          enqueueSnackbar('Something went wrong. Try again later', {
            variant: 'error',
            autoHideDuration: 3000,
          })
          console.log('Error. Try again later')
        })
    }
  }
  useEffect(() => {
    const fetchImage = async (url: string) => {
      try {
        const response = await fetch(url)
        const blob = await response.blob()
        const file = new File([blob], 'avatar', { type: blob.type })
        setAvatarUrl(URL.createObjectURL(file))
      } catch (error) {
        console.error('Error fetching image:', error)
      }
    }
    currentCharacter?.id && fetchImage(currentCharacter?.image)
  }, [currentCharacter])
  return (
    <Box
      sx={{
        maxHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.background.default,
      }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <CharacterSettingsAppBar
        setOpenCharacterSettingsDrawer={setOpenCharacterSettingsDrawer}
        currentCharacter={currentCharacter}
        isFullOpen={isFullOpen}
      />

      <Box
        sx={{
          p: { xs: '20px', sm: '40px' },
          display: 'flex',
          flexDirection: 'column',
          gap: '40px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: '40px',
            alignItems: 'center',
            justifyContent: 'start',
            flexWrap: 'wrap',
          }}
        >
          <RenderImage
            url={avatarUrl}
            currentCharacter={currentCharacter}
            errors={errors}
            setShowImg={setOpenCropDialog}
            fileRef={avatarRef}
          />
          <ControlledFileSelection
            control={control}
            name="image"
            fileRef={avatarRef}
            setUrl={setAvatarUrl}
            id="avatarInput"
            accept=".png,.jpg,.jpeg"
            acceptArr={['image/jpeg', 'image/png', 'image/jpg']}
            prevFile={watch('image')}
            prevFileUrl={avatarUrl}
            setOpenCropDialog={setOpenCropDialog}
          />
          <RenderAudio
            fileRef={voiceRef}
            url={audioUrl}
            currentCharacter={currentCharacter}
            errors={errors}
          />
          <ControlledFileSelection
            control={control}
            name="audio"
            fileRef={voiceRef}
            setUrl={setAudioUrl}
            id="voiceExampleInput"
            accept={acceptAudioFormats.join(',')}
            acceptArr={acceptAudioFormats}
            prevFile={watch('audio')}
            prevFileUrl={audioUrl}
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: '20px' }}>
          <ControlledSelectAutocomplete
            control={control}
            name="textChatType"
            label="Text model"
            errors={errors}
            selectOptions={TEXT_CHAT_OPTIONS}
          />
          <ControlledSelectAutocomplete
            control={control}
            name="speechChatType"
            label="Voice model"
            errors={errors}
            selectOptions={SPEECH_CHAT_OPTIONS}
          />
          <ControlledSelectAutocomplete
            control={control}
            name="videoChatType"
            label="Video model"
            errors={errors}
            selectOptions={VIDEO_CHAT_OPTIONS}
            disabled={!watch('speechChatType')?.value}
          />
        </Box>
        <TextInputControlled name="name" label="Name" errors={errors} control={control} />
        <TextInputControlled
          name="prompt"
          label="Prompt"
          errors={errors}
          control={control}
          multiline={true}
          minRows={2}
        />
        {currentCharacter ? (
          <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'end' }}>
            <CustomButton
              sx={{ px: '40px' }}
              type="submit"
              disabled={isEditCharacterMedia || isEditCharacterData}
            >
              Save
            </CustomButton>
            <CustomButton
              sx={{ px: '40px', backgroundColor: '#e14848' }}
              color="warning"
              type="button"
              onClick={() => setDeleteCharacterModal(true)}
            >
              Delete
            </CustomButton>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <CustomButton sx={{ px: '40px' }} type="submit" disabled={isCreateCharacter}>
              Create
            </CustomButton>
          </Box>
        )}
      </Box>
      {deleteCharacterModal && currentCharacter && (
        <ConfirmDeleteModal
          open={deleteCharacterModal}
          confirmTitle={`Are you sure to delete ${currentCharacter.name}`}
          setDeleteCharacterModal={setDeleteCharacterModal}
          currentCharacter={currentCharacter}
        />
      )}
      {isCreateCharacter && (
        <CreatingCharacterLoader confirmTitle="Wait, I need to get my head together..." />
      )}
      {avatarUrl && openCropDialog && (
        <CropAvatar
          image={avatarUrl}
          setValue={setValue}
          openCropDialog={openCropDialog}
          setOpenCropDialog={setOpenCropDialog}
          setAvatarUrl={setAvatarUrl}
        />
      )}
    </Box>
  )
}
export default CharacterSettingPage
