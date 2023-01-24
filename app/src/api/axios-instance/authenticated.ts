import axios, { AxiosRequestConfig } from "axios/index";
import { getToken } from "../../utils";

const interceptorsConfig = async (config: AxiosRequestConfig) => {
    config.headers.Authorization = `Bearer ${await getToken()}`;
    return config;
}
const authenticated = axios.create({
    baseURL: "http://localhost:3099",
});

authenticated.interceptors.request.use(interceptorsConfig);

export { authenticated }
