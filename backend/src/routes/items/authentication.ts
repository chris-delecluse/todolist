import {AuthenticationController} from "../../controller/AuthenticationController";
import {IRoute} from "../../models/IRoute";

const authController: AuthenticationController = new AuthenticationController();

export const authentication: IRoute[] = [
    {
        method: "POST",
        uri: "/register",
        middleware: [],
        action: authController.registerUser
    },
    {
        method: "POST",
        uri: "/login",
        middleware: [],
        action: authController.loginUser
    }
];
