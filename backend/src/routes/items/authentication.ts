import {AuthenticationController} from "../../controller/AuthenticationController";
import {IRoute} from "../../models/IRoute";
import {Middleware} from "../../middlewares/Middleware";
import {TokenController} from "../../controller/TokenController";

const authController: AuthenticationController = new AuthenticationController();
const tokenController: TokenController = new TokenController();

export const authentication: IRoute[] = [
    {
        method: "post",
        uri: "/register",
        middleware: [],
        handler: authController.registerUser
    },
    {
        method: "post",
        uri: "/login",
        middleware: [],
        handler: authController.loginUser
    },
    {
        method: "get",
        uri: "/logout",
        middleware: [Middleware.authenticateToken],
        handler: authController.logoutUser
    },
    {
        method: "get",
        uri: "/refreshToken",
        middleware: [Middleware.authenticateToken],
        handler: tokenController.refreshToken
    }
];
