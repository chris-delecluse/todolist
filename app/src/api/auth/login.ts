import { AxiosResponse } from "axios";
import { LoginRequest, LoginResponse } from "./types";
import { unauthenticated } from "../axios-instance/unauthenticated";

export const login = async (loginRequest: LoginRequest): Promise<AxiosResponse<LoginResponse>> => {
    try {
        return await unauthenticated.post<LoginResponse>('/login', loginRequest);
    } catch (error) {
        throw new Error(error);
    }
}
