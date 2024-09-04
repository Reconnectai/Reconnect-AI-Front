import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react'
import { themeDark, themeLight } from 'theme'

import { ThemeProvider, Theme } from '@mui/material/styles'

interface ThemeContextProps {
  toggleTheme: () => void
  theme: Theme
  isLoadedTheme:boolean
}

const ThemeContext = createContext<ThemeContextProps>({
  toggleTheme: () => {},
  theme: themeDark,
  isLoadedTheme:true
})

export const useThemeContext = () => useContext(ThemeContext)

interface ThemeProviderProps {
  children: ReactNode
}

export const CustomThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(themeDark)
  const [isLoadedTheme, setIsLoadedTheme] = useState<boolean>(true)
  useEffect(() => {
    const themeMode = localStorage.getItem('themeMode')
    if (themeMode === 'light') {
      setTheme(themeLight)
    } else if (themeMode === 'dark') {
      setTheme(themeDark)
    } else {
      localStorage.setItem('themeMode', 'dark')
    }
    setIsLoadedTheme(false)
  }, [])
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      localStorage.setItem('themeMode', prevTheme.palette.mode === 'light' ? 'dark' : 'light')
      return prevTheme.palette.mode === 'light' ? themeDark : themeLight
    })
  }

  return (
    <ThemeContext.Provider value={{ toggleTheme, theme,isLoadedTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}
