import jwt, {JwtPayload, Secret, SignOptions} from "jsonwebtoken";
import {User} from "../entities/User";
import {File} from "./File";
import {Request} from "express";
import * as dotenv from "dotenv";

dotenv.config();

export class JsonWebToken {
    private _accessTokenPrivateKey: File = new File(process.env.ACCESS_TOKEN_PRIVATE_KEY_PATH!);
    private _accessTokenPublicKey: File = new File(process.env.ACCESS_TOKEN_PUBLIC_KEY_PATH!);
    private _refreshTokenPrivateKey: File = new File(process.env.REFRESH_TOKEN_PRIVATE_KEY_PATH!);
    private _refreshTokenPublicKey: File = new File(process.env.REFRESH_TOKEN_PUBLIC_KEY_PATH!);

    create = (tokenType: string, user: User): string => {
        const type: string = this._validateTokenType(tokenType)

        const payload: JwtPayload = {
            id: user.id,
            email: user.email,
            firstname: user.firstName,
            lastname: user.lastName
        }

        const signOpts: SignOptions = {
            algorithm: "RS256",
            expiresIn: type === "access" ? "15m" : "7d"
        }

        const privateKey: Secret = {
            key: this._getPrivateKey(tokenType),
            passphrase: process.env.PRIVATE_KEY_PASSPHRASE!
        };

        return jwt.sign(payload, privateKey, signOpts);
    }

    getFromHeaders = (req: Request): string | undefined =>
        req.headers.authorization && req.headers.authorization.split(" ")[1]

    decode = (tokenType: string, token: string) => jwt.verify(token, this._getPublicKey(tokenType))

    private _validateTokenType = (tokenType: string): string => {
        if (tokenType !== "access" && tokenType !== "refresh")
            throw new Error("Invalid token type")

        return tokenType;
    }

    private _getPublicKey = (tokenType: string): Buffer =>
        this._validateTokenType(tokenType) === "access" ? this._accessTokenPublicKey.getHash() : this._refreshTokenPublicKey.getHash()


    private _getPrivateKey = (tokenType: string): Buffer =>
        this._validateTokenType(tokenType) === "access" ? this._accessTokenPrivateKey.getHash() : this._refreshTokenPrivateKey.getHash()
}
