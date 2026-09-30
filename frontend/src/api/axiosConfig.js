import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://10.247.177.101:5000/api',
    headers: {
        'Content-Type': 'application/json',
    }
});

