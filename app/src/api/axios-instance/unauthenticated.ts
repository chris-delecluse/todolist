import axios from "axios/index";

export const unauthenticated = axios.create({
    baseURL: "http://localhost:3099",
});
