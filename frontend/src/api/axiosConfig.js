import axios from 'axios';
const URL = process.env.NODE_ENV ? import.meta.env.VITE_API_URL : 'http://10.247.177.101:5000/api';
export const api = axios.create({
    baseURL: URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

