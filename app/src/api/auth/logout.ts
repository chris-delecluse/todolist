import * as SecureStore from "expo-secure-store";
import { authenticated } from "../axios-instance/authenticated";

export const logout = async () => {
    return await authenticated.get('/logout');
}

export const logoutAll = async () => {
    try {
        const response = await authenticated.get<any>('/logoutAll');
        if (response.status === 200) {
            return await SecureStore.deleteItemAsync('accessToken');
        }
    } catch (error) {
        throw new Error(error);
    }
}
