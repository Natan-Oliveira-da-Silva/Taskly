export type GetProfileResponseDTO = {
    uid: string;
    email: string;
    name: string;
    picture: string;
};

export type UpdateProfileRequestDTO = {
    picture?: string;
};

export type UpdateProfileResponseDTO = {
    success: boolean;
};