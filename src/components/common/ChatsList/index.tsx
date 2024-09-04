import React, {useCallback, useEffect, useRef, useState} from 'react'
import { useInView } from 'react-intersection-observer'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useGetCharactersQuery } from 'services/characters/api'
import { Character } from 'services/characters/types'
import { AppDispatch, RootState } from 'store'
import { setCharacterListQuery } from 'store/reducers/characterListReducer'
import { preloadImages } from 'utils/preloadingImages'

import MenuIcon from '@mui/icons-material/Menu'
import {Box, debounce, IconButton, useTheme} from '@mui/material'

import CreateCharacterDrawer from '../CreateCharacterDrawer'
import MainDrawer from '../MainDrawer'
import TextInput from '../TextInput/TextInputBasic'
import AddCharacter from './AddCharacter'
import CharacterItem from './CharacterItem/CharacterItem'
import CharactersPreloader from './CharactersPreloader'

const ChatsList = () => {
  const { chatId } = useParams()
  const theme = useTheme()
  const dispatch: AppDispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user)
  const isCharacterListQuery = useSelector(
    (state: RootState) => state.characterList.isCharacterListQuery
  )
  const messagesStartRef = useRef<HTMLDivElement | null>(null)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [page, setPage] = useState<number>(0)
  const { data: charactersListRTK, isFetching: isLoadingCharactersList } = useGetCharactersQuery({
    page: isCharacterListQuery ? page : 0,
    pageSize: 20,
    query:debouncedSearch
  })
  const [charactersList, setCharactersList] = useState<Character[]>([])
  const [openMainDrawer, setOpenMainDrawer] = useState<boolean>(false)
  const [selectedChat, setSelectedChat] = useState<number | null>(null)
  const [openCreateCharacterDrawer, setOpenCreateCharacterDrawer] = useState<boolean>(false)
  const [shouldRender, setShouldRender] = useState(false)
  const { ref, inView } = useInView({ threshold: 0.5 })
  useEffect(() => {
    if (charactersListRTK?.content !== undefined && isCharacterListQuery) {
      (async () => {
        const images = charactersListRTK.content.map((character) => character.image)
        await preloadImages(images)
        setCharactersList((prev) => [...prev, ...charactersListRTK.content])
        setShouldRender(true)
      })()
    } else if (charactersListRTK?.content !== undefined && !isCharacterListQuery) {
      setCharactersList(charactersListRTK.content)
      if (messagesStartRef.current) {
        messagesStartRef.current.scrollIntoView({ block: 'start' })
      }
      setPage(0)
    } else if (charactersListRTK === undefined && !isLoadingCharactersList) {
      setShouldRender(true)
    }
  }, [charactersListRTK, isLoadingCharactersList])
  useEffect(() => {
    if (chatId) setSelectedChat(+chatId)
    else setSelectedChat(null)
  }, [chatId])

  useEffect(() => {
    if (
      inView &&
      !isLoadingCharactersList &&
      charactersListRTK &&
      charactersListRTK?.totalPages - 1 >= page + 1
    ) {
      setPage((prev) => prev + 1)
      dispatch(setCharacterListQuery(true))
    }
  }, [inView])
  const debouncedSetSearch = useCallback(
    debounce((value: string) => {
      setDebouncedSearch(value);
    }, 300),
    []
  );
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value
    dispatch(setCharacterListQuery(false))
    setSearch(value)
    debouncedSetSearch(value);
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        minWidth: { xs: '0px', sm: '400px' },
        minHeight: '100vh',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        borderRight: {
          xs: 'none',
          sm: `1px solid ${theme.palette.grey[600]}`,
        },
        backgroundColor: theme.palette.background.default,
        boxSizing: 'border-box',
      }}
    >
      <Box
        sx={{
          p: '25px 10px 15px 10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '30px',
          width: '100%',
          height: '100px',
          boxSizing: 'border-box',
        }}
      >
        <IconButton
          edge="end"
          size="large"
          color="secondary"
          aria-label="menu"
          onClick={() => setOpenMainDrawer(true)}
        >
          <MenuIcon sx={{ width: '30px', height: '30px' }} />
        </IconButton>
        <TextInput handleInputChange={handleInputChange} value={search} label="Search" />
      </Box>
      {!shouldRender ? (
        <CharactersPreloader />
      ) : (
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(0, 0, 0, 0)',
              borderRadius: '#101638',
            },
            '&:hover::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(106, 106, 106, 0.6)',
            },
            overflowX: 'hidden',
          }}
        >
          <AddCharacter
            setOpenCreateCharacterDrawer={setOpenCreateCharacterDrawer}
            messagesStartRef={messagesStartRef}
          />
          {Array.isArray(charactersList) &&
            charactersList
              .map((chat) => (
                <CharacterItem
                  chat={chat}
                  setSelectedChat={setSelectedChat}
                  selectedChat={selectedChat}
                  chatId={chatId}
                  key={chat.id}
                />
              ))}
          <Box ref={ref} />
        </Box>
      )}
      <MainDrawer
        openMainDrawer={openMainDrawer}
        setOpenMainDrawer={setOpenMainDrawer}
        user={user}
      />
      <CreateCharacterDrawer
        openCreateCharacterDrawer={openCreateCharacterDrawer}
        setOpenCreateCharacterDrawer={setOpenCreateCharacterDrawer}
      />
    </Box>
  )
}
export default ChatsList
