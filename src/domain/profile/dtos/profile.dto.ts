export type GetProfileResponseDTO = { 
    uid: string;
    email: string;
    name: string;
    phone_number: string;
    picture: string;
};

export type UpdateProfileRequestDTO = {
    name?: string;
    phone_number?: string;
    picture?: string;
};

export type UpdateProfileResponseDTO = {
    success: boolean;
};
