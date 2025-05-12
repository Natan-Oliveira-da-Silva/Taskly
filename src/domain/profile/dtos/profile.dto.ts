export type GetProfileResponseDTO = {
    uid: string;
    email: string;
    name: string;
    picture: string;
    phone_number: string;
};

export type UpdateProfileRequestDTO = {
    picture?: string;
    name?: string,
    phone_number?: string,
};

export type UpdateProfileResponseDTO = {
    success: boolean;
};