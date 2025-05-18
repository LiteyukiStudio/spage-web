import axios from 'axios';

export const API_ROOT = (import.meta.env.VITE_API_ROOT !== undefined ? import.meta.env.VITE_API_ROOT : 'http://localhost:8888') + '/api/v1';

export const apiClient = axios.create({
    baseURL: API_ROOT,
    // 添加超时设置
    timeout: 10000,
    withCredentials: true
});