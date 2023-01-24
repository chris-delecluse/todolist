import { TokenResponse } from "./types";
import { AxiosResponse } from "axios";
import { unauthenticated } from "../axios-instance/unauthenticated";
import * as SecureStore from "expo-secure-store";

export const refreshToken = async (): Promise<AxiosResponse<TokenResponse>> => {
	try {
		return await unauthenticated.get<TokenResponse>('/token/refresh', {
			headers: {
				authorization: `Bearer ${await SecureStore.getItemAsync('accessToken')}`
			}
		});
	} catch (error) {
		throw new Error(error);
	}
};
