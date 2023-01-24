import * as SecureStore from "expo-secure-store";

export const storeToken = async (token: string) => {
    await SecureStore.setItemAsync('accessToken', token);
};
