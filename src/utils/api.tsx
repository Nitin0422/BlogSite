import axios from 'axios'

const api = axios.create({
    baseURL: 'https://some-domain.com/api/',
    timeout: 1000,
  });

export default api