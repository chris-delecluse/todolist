import {Request, Response} from "express";
import bcrypt from "bcrypt";
import {UserService} from "../services/UserService";
import {User} from "../entities/User";
import {IUserRegisterRequest} from "../models/IUserRegisterRequest";
import {IUserLoginRequest} from "../models/IUserLoginRequest";
import {JsonWebToken} from "../helpers/JsonWebToken";
import {HttpAuthentication} from "../http-response-messages/HttpAuthentication";
import {HttpUser} from "../http-response-messages/HttpUser";
import {HttpFormValidation} from "../http-response-messages/HttpFormValidation";

export class AuthenticationController {
    private _emailRegex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    private _passwordRegex: RegExp = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{5,16}$/;
    private _usernameRegex: RegExp = /^[a-zA-Z]{3,20}$/;

    private _userService: UserService;
    private _jwtHelper: JsonWebToken;

    constructor() {
        this._userService = new UserService();
        this._jwtHelper = new JsonWebToken();
    }

    loginUser = async (req: Request, res: Response): Promise<Response> => {
        const {email, password} = await req.body as IUserLoginRequest

        if (!email) return HttpAuthentication.loginMissingField(res);
        if (!password) return HttpAuthentication.loginMissingField(res);

        const user = await this._userService.getOneByEmail(email)

        if (!user) return HttpAuthentication.loginIncorrectData(res)
        if (!await this._verifyPassword(password, user)) return HttpAuthentication.loginIncorrectData(res)

        const token = this._jwtHelper.create(user)

        return res
            .status(200)
            .json({
                status: 'success',
                results: {
                    token: token,
                    expireIn: 60000 * 30
                }
            })
    };

    registerUser = async (req: Request, res: Response): Promise<Response> => {
        const {firstname, lastname, email, password} = req.body as IUserRegisterRequest;

        if (!firstname) return HttpUser.noUserFirstname(res);
        if (!lastname) return HttpUser.noUserLastname(res);
        if (!email) return HttpUser.noUserEmail(res);
        if (!password) return HttpUser.noUserPassword(res);

        if (!this._usernameRegex.test(firstname)) return HttpFormValidation.invalidFirstnameField(res);
        if (!this._usernameRegex.test(lastname)) return HttpFormValidation.invalidLastnameField(res);
        if (!this._emailRegex.test(email)) return HttpFormValidation.invalidEmailField(res);
        if (!this._passwordRegex.test(password)) return HttpFormValidation.invalidPasswordField(res);

        if (await this._checkEmailExist(email)) return HttpAuthentication.userAlreadyExist(res);

        bcrypt.hash(password, 10,
            async (err: Error | undefined, encrypted: string) => {
                if (err) console.error(err);

                const user: User = new User();
                user.firstName = firstname;
                user.lastName = lastname;
                user.email = email;
                user.password = encrypted;

                await this._userService.add(user);
            });

        return res
            .status(201)
            .json({
                status: "success",
                message: "user register successfully"
            });
    };

    private _checkEmailExist = async (email: string): Promise<User | null> =>
        await this._userService.getOneByEmail(email);

    private _verifyPassword = async (password: string, user: User): Promise<boolean> =>
        await bcrypt.compare(password, user.password)
}
