import api from '../../../utils/api.ts';

import {
    GetProfileResponseDTO,
    UpdateProfileRequestDTO,
    UpdateProfileResponseDTO,
} from '../dtos/profile.dto.ts';

const getProfile = async (): Promise<GetProfileResponseDTO> => {
    const response = await api.get<GetProfileResponseDTO>('/profile');
    return response.data;
};

const updateProfile = async (
    data: UpdateProfileRequestDTO
): Promise<UpdateProfileResponseDTO> => {
    const response = await api.put<UpdateProfileResponseDTO>('/profile', data);
    return response.data;
};

const updateProfileAvatar = async (
    data: UpdateProfileRequestDTO
): Promise<UpdateProfileRequestDTO> => {
    const response = await api.put<UpdateProfileRequestDTO>('/profile', data);
    return response.data;
};

export const profileService = {
    getProfile,
    updateProfile,
    updateProfileAvatar,
};
