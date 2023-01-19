import {Request, Response} from "express";
import {TokenManager} from "../helpers/TokenManager";
import {UserService} from "../services/UserService";
import {IToken} from "../models/IToken";
import {HttpAuthError} from "../http-response-messages/HttpAuthError";

/**
 *  * TokenController class handles the refreshing of JSON web tokens (JWT).
 */
export class TokenController {
    private _tokenManager: TokenManager;
    private _userService: UserService;

    constructor() {
        this._tokenManager = new TokenManager();
        this._userService = new UserService();
    }

    /**
     * Refreshes the JSON web token (JWT).
     * @param {Request} req - Express Request object.
     * @param {Response} res - Express Response object.
     * @returns {Promise<Response>} - Promise of Express Response object.
     */
    refreshToken = async (req: Request, res: Response): Promise<Response> => {
        const token = this._tokenManager.getAccessTokenFromHeaders(req);

        if (!token) return HttpAuthError.noTokenProvided(res);
        if (await this._tokenManager.isBlacklisted(token)) return HttpAuthError.invalidToken(res);

        const decoded = this._tokenManager.decodeRefreshToken(token) as IToken;
        if (!decoded) return HttpAuthError.invalidToken(res);
        if (this._tokenManager.isExpired(decoded)) return HttpAuthError.tokenExpired(res);

        const user = await this._userService.getOneById(decoded.id);
        if (!user) return HttpAuthError.userNotFound(res);

        const accessToken = this._tokenManager.createAccessToken(user);

        return res.status(200).json({
            status: 'success',
            results: {
                access: {
                    token: accessToken,
                    expireIn: 900
                }
            }
        });
    }
}
