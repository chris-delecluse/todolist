import { AxiosResponse } from "axios";
import { unauthenticated } from "../axios-instance/unauthenticated";
import { RegisterRequest, RegisterResponse } from "./types";

export const register = async (registerRequest: RegisterRequest): Promise<AxiosResponse<RegisterResponse>> => {
    try {
        return await unauthenticated.post<RegisterResponse>('/register', registerRequest);
    } catch (error) {
        throw new Error(error);
    }
}
