// src/utils/storage.ts

import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = '@taskly:token';
const REFRESH_KEY = '@taskly:refresh';

export const storage = {
    async saveToken(token: string) {
        await AsyncStorage.setItem(TOKEN_KEY, token);
    },

    async getToken(): Promise<string | null> {
        return await AsyncStorage.getItem(TOKEN_KEY);
    },

    async removeToken() {
        await AsyncStorage.removeItem(TOKEN_KEY);
    },

    async saveRefreshToken(refresh: string) {
        await AsyncStorage.setItem(REFRESH_KEY, refresh);
    },

    async getRefreshToken(): Promise<string | null> {
        return await AsyncStorage.getItem(REFRESH_KEY);
    },

    async removeRefreshToken() {
        await AsyncStorage.removeItem(REFRESH_KEY);
    },

    async clear() {
        await AsyncStorage.multiRemove([TOKEN_KEY, REFRESH_KEY]);
    },
};
