import { login } from "./auth/login";
import { register } from "./auth/register";
import { refreshToken } from "./token/refreshToken";
import { logout, logoutAll } from "./auth/logout";

export {
	// auth
	login as userLoginAxios,
	register as userRegisterAxios,
	logout as userLogoutAxios,
	logoutAll as userLogoutAllAxios,
	// token
	refreshToken as userRefreshTokenAxios,
	// task
};
