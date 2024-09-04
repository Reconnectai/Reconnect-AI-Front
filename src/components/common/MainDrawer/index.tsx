import { ReactComponent as Logo } from 'assets/logo.svg'
import JW from 'assets/testAvatar/JohnnieWilliams.png'
import React, { FC, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import ContactSupportIcon from '@mui/icons-material/ContactSupport'
import PersonIcon from '@mui/icons-material/Person'
import SettingsIcon from '@mui/icons-material/Settings'
import { Box, Drawer, Skeleton, Typography, useTheme } from '@mui/material'

import SwitchTheme from '../SwitchTheme'
import Capabilities from './Capabilities'
import DialogToDrawerItems from './DialogToDrawerItems'
import DrawerItem from './DrawerItem'
import Profile from './Profile'
import Settings from './Settings'
import {preloadImages} from "utils/preloadingImages";

interface IProps {
  user: {
    firstName: string
    lastName: string
    avatar: string
  }
  openMainDrawer: boolean
  setOpenMainDrawer: React.Dispatch<React.SetStateAction<boolean>>
}

const MainDrawer: FC<IProps> = ({ user, openMainDrawer, setOpenMainDrawer }) => {
  const theme = useTheme()
  const [checkedItem, setCheckedItem] = useState<string>('')
  const [isAvatarLoad, setIsAvatarLoad] = useState<boolean>(false)
  const location = useLocation()
  useEffect(() => {
    setOpenMainDrawer(false)
    setCheckedItem('')
  }, [location])
  useEffect(() => {
    (async () => {
      const imagesArray = [JW]
      await preloadImages(imagesArray)
      setIsAvatarLoad(true)
    })()
  }, [])
  return (
    <Drawer
      open={openMainDrawer}
      onClose={() => {
        setOpenMainDrawer(false)
      }}
      anchor={'left'}
      sx={{
        '.MuiDrawer-paper': {
          maxWidth: '300px',
          width: '100%',
          backgroundColor: theme.palette.background.default,
          backgroundImage: 'none',
        },
      }}
    >
      <Box
        sx={{
          p: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          width: '100%',
          cursor: 'pointer',
          boxSizing: 'border-box',
        }}
        onClick={() => {
          setOpenMainDrawer(false)
        }}
      >
        <Logo />
        <Typography
          sx={{
            fontSize: '30px',
            fontWeight: 400,
            lineHeight: '20px',
            textAlign: 'left',
            color: theme.palette.text.primary,
          }}
        >
          Reconnect AI
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          gap: '10px',
        }}
      >
        <Box
          sx={{
            p: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'start',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px',
              alignSelf: 'center',
            }}
          >
            {!isAvatarLoad ? (
              <Skeleton
                animation="pulse"
                variant="circular"
                sx={{
                  alignSelf: 'start',
                }}
                width={70}
                height={70}
              />
            ) : JW ? (
              <Box
                component="img"
                src={JW}
                sx={{
                  alignSelf: 'start',
                  borderRadius: '50%',
                  width: '70px',
                  height: '70px',
                }}
              />
            ) : (
              <Box
                sx={{
                  borderRadius: '50%',
                  width: '70px',
                  height: '70px',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  background: 'radial-gradient(circle, violet, blue)',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '20px',
                    fontWeight: 400,
                    lineHeight: '20px',
                    textAlign: 'left',
                    color: theme.palette.text.primary,
                  }}
                >
                  {`${user?.firstName?.[0].toUpperCase()} ${user?.lastName?.[0].toUpperCase()}`}
                </Typography>
              </Box>
            )}
            <Typography
              sx={{
                fontSize: '14px',
                fontWeight: 700,
                lineHeight: '20px',
                textAlign: 'left',
                color: theme.palette.text.primary,
              }}
            >
              {`${user?.firstName} ${user?.lastName}`}
            </Typography>
          </Box>
          <SwitchTheme />
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <DrawerItem title="Profile" setCheckedItem={setCheckedItem}>
            {' '}
            <PersonIcon sx={{ width: '25px', height: '25px' }} />
          </DrawerItem>
          <DrawerItem title="Settings" setCheckedItem={setCheckedItem}>
            <SettingsIcon sx={{ width: '25px', height: '25px' }} />
          </DrawerItem>
          <DrawerItem title="Capabilities" setCheckedItem={setCheckedItem}>
            <ContactSupportIcon sx={{ width: '25px', height: '25px' }} />
          </DrawerItem>
        </Box>
      </Box>
      {checkedItem === 'Profile' && (
        <DialogToDrawerItems title={'Profile'} setCheckedItem={setCheckedItem}>
          <Profile />
        </DialogToDrawerItems>
      )}
      {checkedItem === 'Settings' && (
        <DialogToDrawerItems title={'Settings'} setCheckedItem={setCheckedItem}>
          <Settings />
        </DialogToDrawerItems>
      )}
      {checkedItem === 'Capabilities' && (
        <DialogToDrawerItems title={'Capabilities'} setCheckedItem={setCheckedItem}>
          <Capabilities />
        </DialogToDrawerItems>
      )}
    </Drawer>
  )
}

export default MainDrawer
