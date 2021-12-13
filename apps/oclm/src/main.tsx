import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import App from './app/app';

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { HOME_FEATURE_KEY, homeReducer } from './app/home/home.slice';

import { AUTH_FEATURE_KEY, authReducer } from './app/auth/auth.slice';

import {
  PRODUCT_FEATURE_KEY,
  productReducer,
} from './app/product/product.slice';

export const store = configureStore({
  reducer: {
    [PRODUCT_FEATURE_KEY]: productReducer,
    [AUTH_FEATURE_KEY]: authReducer,
    [HOME_FEATURE_KEY]: homeReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
  enhancers: [],
});
const mdTheme = createTheme();

ReactDOM.render(
  <Provider store={store}>
    <StrictMode>
      <BrowserRouter>
        <ThemeProvider theme={mdTheme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </StrictMode>
  </Provider>,
  document.getElementById('root')
);
