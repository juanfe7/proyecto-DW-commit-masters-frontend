import axios from 'axios';

const api = axios.create({
  baseURL: 'https://proyecto-dw-commit-masters-backend-v2.vercel.app', // Conexión a la API
});

export default api;
