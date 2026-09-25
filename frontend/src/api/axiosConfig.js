import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://10.94.217.101:5000/api',
    headers: {
        'Content-Type': 'application/json',
    }
});

