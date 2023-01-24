import { TokenResponse } from "../token/types";

// register types
export type RegisterRequest = {
    firstName: string
    lastname: string
    email: string
    password: string
}
export type RegisterResponse = Record<"status", string> & Record<"result", string>;

// login types
export type LoginResponse = Response & Record<"status", string> & Record<"results", TokenResponse>;
export type LoginRequest = Record<"email", string> & Record<"password", string>;

