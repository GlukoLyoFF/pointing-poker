import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store } from 'store';
import persistor from 'store/persistStore';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';
import './index.css';
import 'core/sass/text-styles.scss';

const theme = unstable_createMuiStrictModeTheme();

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
