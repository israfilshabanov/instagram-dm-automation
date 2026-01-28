import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const savePrompt = async (prompt: string) => {
    const response = await api.post('/admin/savePrompt', { prompt });
    return response.data;
};

export const testPrompt = async (message: string) => {
    const response = await api.post('/admin/testPrompt', { message });
    return response.data;
};
