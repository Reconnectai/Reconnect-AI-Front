import { ReactComponent as Logo } from 'assets/logo.svg'
import JW from 'assets/testAvatar/JohnnieWilliams.jpg'
import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { AppDispatch, RootState } from 'store'
import { logout } from 'store/reducers/userReducer'
import { preloadImages } from 'utils/preloadingImages'

import ContactSupportIcon from '@mui/icons-material/ContactSupport'
import PersonIcon from '@mui/icons-material/Person'
import { Box, Drawer, Skeleton, Tooltip, Typography, useTheme } from '@mui/material'

import SwitchTheme from '../SwitchTheme'
import Capabilities from './Capabilities'
import DialogToDrawerItems from './DialogToDrawerItems'
import DrawerItem from './DrawerItem'
import Profile from './Profile'
import Balance from './Balance'
import AptosImg from 'assets/aptos.png'
import { useGetBalanceQuery } from 'services/aptos/api'

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
  const { data: balance } = useGetBalanceQuery()
  const { address } = useSelector((state: RootState) => state.user)
  const [checkedItem, setCheckedItem] = useState<string>('')
  const [isAvatarLoad, setIsAvatarLoad] = useState<boolean>(false)
  const location = useLocation()
  const dispatch = useDispatch<AppDispatch>()
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
            <Tooltip title={address}>
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: 700,
                  lineHeight: '20px',
                  textAlign: 'left',
                  color: theme.palette.text.primary,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  width: '200px',
                }}
              > {address}
                {/*{`${user?.firstName} ${user?.lastName}`}*/}
              </Typography>
            </Tooltip>

          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
            }}
          >
            <Typography
              onClick={() => {
                dispatch(logout())
              }}
              sx={{
                fontSize: '14px',
                fontWeight: 700,
                lineHeight: '20px',
                textAlign: 'left',
                color: theme.palette.text.primary,
                cursor: 'pointer',
              }}
            >
              Logout
            </Typography>
            <SwitchTheme />
          </Box>{' '}
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
          <DrawerItem title="Balance" setCheckedItem={setCheckedItem}>
            <Box component="img" src={AptosImg} sx={{ width: '25px', height: '25px' }} />
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
      {checkedItem === 'Balance' && (
        <DialogToDrawerItems title={'Balance'} setCheckedItem={setCheckedItem}>
          <Balance currentRate={balance?.rate || 0} balance={balance?.balance || 0} setCheckedItem={setCheckedItem} />
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
