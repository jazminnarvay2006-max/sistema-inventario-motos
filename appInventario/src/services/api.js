import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3006' // Conexión con nuestro Backend en Node.js
});

export default api;