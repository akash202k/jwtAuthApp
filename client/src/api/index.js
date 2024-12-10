// api.js

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true, // Enable sending cookies with requests
});

export default api;
