import axios from 'axios';

const api = axios.create({
  baseURL: 'https://proyecto-dw-commit-masters-backend.vercel.app', // o donde tengas tu backend
});

export default api;
