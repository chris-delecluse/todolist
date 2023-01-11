import {AuthenticationController} from "../../controller/AuthenticationController";
import {IRoute} from "../../models/IRoute";

const authController: AuthenticationController = new AuthenticationController();

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
    }
];
