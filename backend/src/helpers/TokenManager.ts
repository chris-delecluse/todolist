import jwt, {JwtPayload, Secret, SignOptions} from "jsonwebtoken";
import {User} from "../entities/User";
import {File} from "./File";
import {Request} from "express";
import * as dotenv from "dotenv";
import {IToken} from "../models/IToken";
import {TokenService} from "../services/TokenService";

dotenv.config();

/**
 * Class representing a JSON Web Token.
 * It is responsible for creating, decoding and validating JWT
 */
export class TokenManager {
    private readonly _accessTokenPrivateKey: File = new File(process.env.ACCESS_TOKEN_PRIVATE_KEY_PATH!);
    private readonly _accessTokenPublicKey: File = new File(process.env.ACCESS_TOKEN_PUBLIC_KEY_PATH!);
    private readonly _refreshTokenPrivateKey: File = new File(process.env.REFRESH_TOKEN_PRIVATE_KEY_PATH!);
    private readonly _refreshTokenPublicKey: File = new File(process.env.REFRESH_TOKEN_PUBLIC_KEY_PATH!);
    private readonly _tokenService: TokenService = new TokenService();

    /**
     * Get the token from the headers of a request object.
     * @param req {Request} The request object containing the headers.
     * @return {string | undefined} The token string if it exists in the headers, otherwise undefined.
     */
    getAccessTokenFromHeaders = (req: Request): string | undefined => req.headers.authorization && req.headers.authorization.split(" ")[1]

    /**
     * Check if the token are not expired.
     * @param decoded The token decoded.
     * @return boolean
     */
    isExpired(decoded: IToken): boolean {
        const current_time = Math.floor(Date.now() / 1000);
        return decoded.exp < current_time;
    }

    /**
     * Checks if the token is blacklisted.
     * @private
     * @param {string} token - The token to check.
     * @returns {Promise<boolean>} - Promise of a boolean indicating if the token is blacklisted.
     */
    isBlacklisted = async (token: string): Promise<boolean> => {
        const blacklistedToken = await this._tokenService.getOne(token);
        return !!blacklistedToken?.isRevoked;
    }

    /**
     * Get the public access key.
     * @return {Buffer} The public access key.
     */
    getPublicAccessKey = (): Buffer => this._accessTokenPublicKey.getHash()

    /**
     * Get the public refresh key.
     * @return {Buffer} The public refresh key.
     */
    getPublicRefreshKey = (): Buffer => this._refreshTokenPublicKey.getHash()

    /**
     * Creates an access token for the given user.
     * @param {User} user - The user for whom the access token is being created.
     * @returns {string} The created access token.
     */
    createAccessToken = (user: User): string => this._create(user, this._getPrivateAccessKey(), "15m")

    /**
     * Creates a refresh token for the given user.
     * @param {User} user - The user for whom the refresh token is being created.
     * @returns {string} The created refresh token.
     */
    createRefreshToken = (user: User): string => this._create(user, this._getPrivateRefreshKey(), "7d")

    /**
     * Decodes the given access token.
     * @param {string} token - The access token to decode.
     * @returns {any} The decoded payload of the access token.
     */
    decodeAccessToken = (token: string) => jwt.verify(token, this.getPublicAccessKey())

    /**
     * Decodes the given refresh token.
     * @param {string} token - The refresh token to decode.
     * @returns {any} The decoded payload of the refresh token.
     */
    decodeRefreshToken = (token: string) => jwt.verify(token, this.getPublicRefreshKey())

    /**
     * Creates a JWT (Json Web Token) using the RS256 algorithm.
     * @param {User} user - The user object for which the JWT is being created.
     * @param {Buffer} buffer - The buffer containing the private key used to sign the JWT.
     * @param {(string | number)} expiresIn - The expiration duration of the JWT, in seconds or in string format "1h", "2d", etc.
     * @returns {string} The created JWT.
     */
    private _create = (user: User, buffer: Buffer, expiresIn: string | number): string => {
        const payload: JwtPayload = {
            id: user.id,
            email: user.email,
            firstname: user.firstName,
            lastname: user.lastName
        };

        const signOpts: SignOptions = {
            algorithm: "RS256",
            expiresIn
        }

        const privateKey: Secret = {
            key: buffer,
            passphrase: process.env.PRIVATE_KEY_PASS_PHRASE!
        }

        return jwt.sign(payload, privateKey, signOpts);
    }

    /**
     * Get the private access key.
     * @return {Buffer} The private access key.
     */
    private _getPrivateAccessKey = (): Buffer => this._accessTokenPrivateKey.getHash()

    /**
     * Get the private refresh key.
     * @return {Buffer} The private refresh key.
     */
    private _getPrivateRefreshKey = (): Buffer => this._refreshTokenPrivateKey.getHash()
}
