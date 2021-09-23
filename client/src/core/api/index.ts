import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8888/api/',
  timeout: 5000,
});

export default axiosInstance;
