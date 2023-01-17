import {Request, Response} from "express";
import bcrypt from "bcrypt";
import {UserService} from "../services/UserService";
import {User} from "../entities/User";
import {IUserRegisterRequest} from "../models/IUserRegisterRequest";
import {IUserLoginRequest} from "../models/IUserLoginRequest";
import {TokenManager} from "../helpers/TokenManager";
import {HttpAuthentication} from "../http-response-messages/HttpAuthentication";
import {HttpUser} from "../http-response-messages/HttpUser";
import {HttpFormValidation} from "../http-response-messages/HttpFormValidation";

/**
 * AuthenticationController handles the routing for all authentication-related routes.
 */
export class AuthenticationController {
    private _emailRegex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    private _passwordRegex: RegExp = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{5,16}$/;
    private _usernameRegex: RegExp = /^[a-zA-Z]{3,20}$/;

    private _userService: UserService;
    private _tokenManager: TokenManager;

    constructor() {
        this._userService = new UserService();
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

        if (!email) return HttpAuthentication.loginMissingField(res);
        if (!password) return HttpAuthentication.loginMissingField(res);

        const user = await this._userService.getOneByEmail(email)

        if (!user) return HttpAuthentication.loginIncorrectData(res)
        if (!await this._verifyPassword(password, user)) return HttpAuthentication.loginIncorrectData(res)

        const accessToken = this._tokenManager.createAccessToken(user);

        // créer et ajouté en db le refresh token si il n'existe pas par contre get le token en database si il est existe, si il est pas expirer
        // et si il est pas banni
        // je bannerai un token quand l'utilisateur seras déconnecté volontairement
        // investiguer sur une methode qui clean les token aprés la date d'expiration
        // garder le token banni jusqu'à la date d'expiration comme ça si le user se reconnecte avec ce token,
        // faire quelque chose car c'est potentiellement un hacker
        // investiguer pour voir si je pars pas dans un délire avec la todo plus haut ;=d

        const refreshToken = this._tokenManager.createRefreshToken(user);

        return res
            .status(200)
            .json({
                status: 'success',
                results: {
                    access: {
                        token: accessToken,
                        expireIn: 900
                    },
                    refresh: {
                        token: refreshToken,
                        expireIn: 604800
                    }
                }
            })
    };

    /**
     * Registers a new user.
     * @param req - Request object that includes the user information.
     * @param res - Response object to send a success message or error message.
     * @returns Returns a response object with a success message or an error message.
     */
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
