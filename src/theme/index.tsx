import { createTheme } from '@mui/material/styles'

const primary = {
  main: '#178DFA',
  text: '#000000',
}

export const themeDark = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#101638',
      paper: '#232d60',
    },
    primary,
    secondary: {
      main: '#E0F1F0',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#000000',
      disabled: '#A6A8AA',
    },
    warning: {
      main: '#ce1637',
      light: '#ee6881',
      dark: '#a42e44',
    },
    error: {
      main: '#FC395C',
      light: '#FFEBEF',
      dark: '#FFD9E0',
    },
    grey: {
      300: '#D2D4D5',
      600: '#797D80',
    },
    common: {
      black: primary.text,
      white: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: ['Raleway', 'sans-serif'].join(','),
    fontWeightRegular: 400,
    fontSize: 14,
    h2: {
      fontSize: 30,
      fontWeight: 700,
    },
    h3: {
      fontSize: '18px',
      fontWeight: 600,
      lineHeight: 1.44,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 1025,
      lg: 1280,
      xl: 1355,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '12px 20px',
          borderRadius: '15px',
          fontWeight: 600,
        },
      },
    },
  },
})

export const themeLight = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f9faff',
      paper: '#ececec',
    },
    primary,
    secondary: {
      main: '#000000',
    },
    text: {
      primary: '#101638',
      secondary: '#ffffff',
      disabled: '#A6A8AA',
    },
    warning: {
      main: '#ce1637',
      light: '#ee6881',
      dark: '#a42e44',
    },
    error: {
      main: '#FC395C',
      light: '#FFEBEF',
      dark: '#FFD9E0',
    },
    grey: {
      300: '#D2D4D5',
      600: '#797D80',
    },
    common: {
      black: '#FFFFFF',
      white: primary.text,
    },
  },
  typography: {
    fontFamily: ['Raleway', 'sans-serif'].join(','),
    fontWeightRegular: 400,
    fontSize: 14,
    h2: {
      fontSize: 30,
      fontWeight: 700,
    },
    h3: {
      fontSize: '18px',
      fontWeight: 600,
      lineHeight: 1.44,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 1025,
      lg: 1280,
      xl: 1355,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '12px 20px',
          borderRadius: '15px',
          fontWeight: 600,
        },
      },
    },
  },
})
