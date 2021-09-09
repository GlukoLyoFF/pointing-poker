import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';
import './index.css';
import './text-styles.scss';
import '@fontsource/roboto';
import '@fontsource/ruda';

const theme = unstable_createMuiStrictModeTheme();

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
