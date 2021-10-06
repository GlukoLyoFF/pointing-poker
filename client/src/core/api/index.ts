import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://carabaz.herokuapp.com/api',
  timeout: 5000,
});

export default axiosInstance;
