import jwt, {JwtPayload, Secret, SignOptions} from "jsonwebtoken";
import {User} from "../entities/User";
import * as fs from "fs";
import path from "path";
import {Request} from "express";

export class JsonWebToken {
    private _privateHash: Buffer = fs.readFileSync(path.join(__dirname, "../../private.pem"))
    private _publicHash: Buffer = fs.readFileSync(path.join(__dirname, "../../public.pem"))

    getFromHeaders = (req: Request): string | undefined =>
        req.headers.authorization && req.headers.authorization.split(" ")[1]

    create = (user: User) => {
        const payload: JwtPayload = {
            id: user.id,
            email: user.email,
            firstname: user.firstName,
            lastname: user.lastName
        };

        const signOpts: SignOptions = {
            algorithm: "RS256",
            expiresIn: "1800s",
        };

        const privateKey: Secret = {
            key: this._privateHash,
            passphrase: process.env.PRIVATE_KEY_PASS_PHRASE!
        };

        return jwt.sign(payload, privateKey, signOpts);
    };

    decode = (token: string) => jwt.verify(token, this._publicHash)
}
