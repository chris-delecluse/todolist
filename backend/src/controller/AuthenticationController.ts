import {Request, Response} from "express";
import bcrypt from "bcrypt";
import {UserService} from "../services/UserService";
import {User} from "../entities/User";
import {IUserRegisterRequest} from "../models/IUserRegisterRequest";
import {IUserLoginRequest} from "../models/IUserLoginRequest";
import {TokenManager} from "../helpers/TokenManager";
import {HttpAuthError} from "../http-response-messages/HttpAuthError";
import {HttpUserError} from "../http-response-messages/HttpUserError";
import {HttpFormValidation} from "../http-response-messages/HttpFormValidation";
import {TokenService} from "../services/TokenService";
import {Token} from "../entities/Token";

/**
 * AuthenticationController handles the routing for all authentication-related routes.
 */
export class AuthenticationController {
    private _emailRegex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    private _passwordRegex: RegExp = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{5,16}$/;
    private _usernameRegex: RegExp = /^[a-zA-Z]{3,20}$/;

    private _userService: UserService;
    private _tokenService: TokenService;
    private _tokenManager: TokenManager;

    constructor() {
        this._userService = new UserService();
        this._tokenService = new TokenService();
        this._tokenManager = new TokenManager();
    }

    /**
     * Logs in a user.
     * @param req - Request object that includes the email and password.
     * @param res - Response object to send the token or error message.
     * @returns Returns a response object with the token or an error message.
     */
    loginUser = async (req: Request, res: Response): Promise<Response> => {
        const {email, password} = await req.body as IUserLoginRequest

        if (!email) return HttpAuthError.loginMissingField(res);
        if (!password) return HttpAuthError.loginMissingField(res);

        const user = await this._userService.getOneByEmail(email)

        if (!user) return HttpAuthError.loginIncorrectData(res)
        if (!await this._verifyPassword(password, user)) return HttpAuthError.loginIncorrectData(res)

        const accessToken = this._tokenManager.createAccessToken(user);
        const refreshToken = this._tokenManager.createRefreshToken(user);

        const tokenToStore = new Token()
        tokenToStore.accessToken = accessToken
        tokenToStore.refreshToken = refreshToken
        tokenToStore.refreshTokenExpires = this._tokenManager.getIat(refreshToken);
        tokenToStore.userId = user.id;

        await this._tokenService.add(tokenToStore);

        return res
            .status(200)
            .json({
                status: 'success',
                results: {
                    token: accessToken,
                    expireIn: 900,
                }
            })
    };

    /**
     * Logs out the user by revoking the refresh token.
     * @param {Request} req - Express Request object.
     * @param {Response} res - Express Response object.
     * @returns {Promise<Response>} - Promise of Express Response object.
     */
    logoutUser = async (req: Request, res: Response): Promise<Response> => {
        const token = this._tokenManager.getAccessTokenFromHeaders(req);
        if (!token) return HttpAuthError.noTokenProvided(res);

        const tokenEntity = await this._tokenService.getOneByAccessToken(token);
        if (!tokenEntity) return HttpAuthError.invalidToken(res);

        return res.status(200).json({
            status: 'success',
            results: 'logged out successfully'
        })
    }

    /**
     * Registers a new user.
     * @param req - Request object that includes the user information.
     * @param res - Response object to send a success message or error message.
     * @returns Returns a response object with a success message or an error message.
     */
    registerUser = async (req: Request, res: Response): Promise<Response> => {
        const {firstname, lastname, email, password} = req.body as IUserRegisterRequest;

        if (!firstname) return HttpUserError.noUserFirstname(res);
        if (!lastname) return HttpUserError.noUserLastname(res);
        if (!email) return HttpUserError.noUserEmail(res);
        if (!password) return HttpUserError.noUserPassword(res);

        if (!this._usernameRegex.test(firstname)) return HttpFormValidation.invalidFirstnameField(res);
        if (!this._usernameRegex.test(lastname)) return HttpFormValidation.invalidLastnameField(res);
        if (!this._emailRegex.test(email)) return HttpFormValidation.invalidEmailField(res);
        if (!this._passwordRegex.test(password)) return HttpFormValidation.invalidPasswordField(res);

        if (await this._checkEmailExist(email)) return HttpAuthError.userAlreadyExist(res);

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

    /**
     * Checks if an email address is already in use.
     * @param email - Email address to check.
     * @returns Returns the user if the email is in use, otherwise null.
     */
    private _checkEmailExist = async (email: string): Promise<User | null> =>
        await this._userService.getOneByEmail(email);

    /**
     * Verifies that a password matches the user's password.
     * @param password - Password to verify.
     * @param user - User to check the password against.
     * @returns Returns true if the password matches, otherwise false.
     */
    private _verifyPassword = async (password: string, user: User): Promise<boolean> =>
        await bcrypt.compare(password, user.password)
}
