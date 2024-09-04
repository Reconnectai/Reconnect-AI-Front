import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {RouterProvider} from "react-router-dom";
import router from "./pages";
import {Provider} from "react-redux";
import {store} from "./store";
import { SnackbarProvider } from 'notistack'
import {CustomThemeProvider} from "./theme/themeContext";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <CustomThemeProvider>
        <SnackbarProvider>
            <RouterProvider router={router} />
        </SnackbarProvider>
    </CustomThemeProvider>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
