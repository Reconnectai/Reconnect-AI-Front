import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import { SnackbarProvider } from 'notistack'
import { CustomThemeProvider } from './theme/themeContext'
import AppRouter from './pages'
import { PetraWallet } from 'petra-plugin-wallet-adapter'
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react'

const wallets = [new PetraWallet()]
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
)

root.render(
  <AptosWalletAdapterProvider
    plugins={wallets}
    autoConnect={true}
    onError={(error) => {
      console.log('error', error)
    }}>
    <Provider store={store}>
      <CustomThemeProvider>
        <SnackbarProvider>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </SnackbarProvider>
      </CustomThemeProvider>
    </Provider>
  </AptosWalletAdapterProvider>,
)

reportWebVitals()
