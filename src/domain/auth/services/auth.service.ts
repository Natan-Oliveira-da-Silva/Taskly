// src/domain/auth/services/auth.service.ts

import api from '../../../utils/api';
import { storage } from '../../../utils/storage';

import {
    LoginRequestDTO,
    LoginResponseDTO,
    RegisterRequestDTO,
    RegisterResponseDTO,
    RefreshTokenRequestDTO,
    RefreshTokenResponseDTO,
} from '../dto/login.dto.ts';

const login = async (
    data: LoginRequestDTO
): Promise<LoginResponseDTO> => {
    const response = await api.post<LoginResponseDTO>('/auth/login', data);
    await storage.saveToken(response.data.id_token);
    await storage.saveRefreshToken(response.data.refresh_token);
    return response.data;
};

const register = async (
    data: RegisterRequestDTO
): Promise<RegisterResponseDTO> => {
    const response = await api.post<RegisterResponseDTO>('/auth/register', data);
    await storage.saveToken(response.data.idToken);
    return response.data;
};

const refreshToken = async (
    data: RefreshTokenRequestDTO
): Promise<RefreshTokenResponseDTO> => {
    const response = await api.post<RefreshTokenResponseDTO>('/auth/refresh', data);
    return response.data;
};

export const authService = {
    login,
    register,
    refreshToken,
};
