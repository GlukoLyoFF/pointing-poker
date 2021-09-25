import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';
import './index.css';
import './text-styles.scss';
import '@fontsource/roboto';
import '@fontsource/ruda';

import { io } from 'socket.io-client';
const SERVER_URL = 'http://localhost:5000';
export const ws = io(SERVER_URL);
ws.on('connection', data => console.log(data));
ws.on('disconnection', data => console.log(data));

ws.on('startGameMsg', data => console.log(data));
ws.on('changeGameSettingsMsg', data => console.log(data));
ws.on('changeTitleMsg', data => console.log(data));
ws.on('endGameMsg', data => console.log(data));

ws.on('createUserMsg', data => console.log(data));
ws.on('chooseUserMsg', data => console.log(data));
ws.on('deleteUserMsg', data => console.log(data));

ws.on('createIssueMsg', data => console.log(data));
ws.on('chooseIssueMsg', data => console.log(data));
ws.on('updateIssueMsg', data => console.log(data));
ws.on('deleteIssueMsg', data => console.log(data));

const theme = unstable_createMuiStrictModeTheme();

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
