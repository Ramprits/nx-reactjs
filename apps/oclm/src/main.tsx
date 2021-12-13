import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app/app';

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { HOME_FEATURE_KEY, homeReducer } from './app/home/home.slice';

import { AUTH_FEATURE_KEY, authReducer } from './app/auth/auth.slice';

export const store = configureStore({
  reducer: { [AUTH_FEATURE_KEY]: authReducer, [HOME_FEATURE_KEY]: homeReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
  enhancers: [],
});

ReactDOM.render(
  <Provider store={store}>
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  </Provider>,
  document.getElementById('root')
);
