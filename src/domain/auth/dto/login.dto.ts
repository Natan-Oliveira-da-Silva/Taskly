export type LoginRequestDTO = {
    email: string;
    password: string;
};

export type LoginResponseDTO = {
    id_token: string;
    refresh_token: string;
};

export type RefreshTokenRequestDTO = {
    refreshToken: string;
};

export type RefreshTokenResponseDTO = {
    idToken: string;
    refreshToken: string;
    expiresIn: string;
};

export type RegisterRequestDTO = {
    email: string;
    password: string;
    name: string;
    phone_number: string;
};

export type RegisterResponseDTO = {
    uid: string;
    idToken: string;
};

