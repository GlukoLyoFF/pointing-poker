import axios from 'axios';
import { io } from 'socket.io-client';

const SERVER_URL = 'http://localhost:5000';
export const ws = io(SERVER_URL);

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8888/api/',
  timeout: 5000,
});

export default axiosInstance;
