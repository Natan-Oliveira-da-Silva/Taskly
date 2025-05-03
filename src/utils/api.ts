// src/utils/api.ts
import axios from 'axios';
import { storage } from './storage';
import { authService } from '../domain/auth';

const api = axios.create({
    baseURL: 'https://sua-api.com',
    timeout: 10000,
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

api.interceptors.request.use(async (config) => {
    const token = await storage.getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({
                        resolve: (token: string) => {
                            originalRequest.headers.Authorization = `Bearer ${token}`;
                            resolve(api(originalRequest));
                        },
                        reject: (err: any) => reject(err),
                    });
                });
            }

            isRefreshing = true;

            try {
                const refreshToken = await storage.getRefreshToken();
                if (!refreshToken) throw new Error('No refresh token');

                const refreshed = await authService.refreshToken({ refreshToken });
                await storage.saveToken(refreshed.idToken);
                await storage.saveRefreshToken(refreshed.refreshToken);

                processQueue(null, refreshed.idToken);

                originalRequest.headers.Authorization = `Bearer ${refreshed.idToken}`;
                return api(originalRequest);
            } catch (err) {
                processQueue(err, null);
                await storage.clear();
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;
