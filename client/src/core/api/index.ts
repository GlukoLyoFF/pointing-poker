import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://carabaz.herokuapp.com/api',
  timeout: 5000,
});

export default axiosInstance;
