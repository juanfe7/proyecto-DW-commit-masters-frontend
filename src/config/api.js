import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // o donde tengas tu backend
});

export default api;
