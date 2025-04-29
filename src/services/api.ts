import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://sua-api-aqui.com', // substitua depois
    headers: {
        'Content-Type': 'application/json',
    },
});
