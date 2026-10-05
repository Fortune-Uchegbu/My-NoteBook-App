import axios from 'axios';
const URL = process.env.NODE_ENV ? 'https://my-notebook-app-p9ot.onrender.com/' : 'http://10.247.177.101:5000/api';
export const api = axios.create({
    baseURL: URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

