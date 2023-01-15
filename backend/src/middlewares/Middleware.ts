import {NextFunction, Request, Response} from "express";
import rateLimit, {RateLimitRequestHandler} from 'express-rate-limit'
import path from "path";
import * as fs from "fs";
import {Secret, verify} from "jsonwebtoken";
import {TokenManager} from "../helpers/TokenManager";

export class Middleware {
    private static  _jwtHelper: TokenManager = new TokenManager()

    static limiter: RateLimitRequestHandler = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 50,
        standardHeaders: true,
        legacyHeaders: false
    })

    static jwt = async (req: Request, res: Response, next: NextFunction) => {
        const token: string | undefined = this._jwtHelper.getTokenFromHeaders(req)

        if (!token) return res.status(401).json({status: 'unauthorized'});

        const publicKey: Secret = this._jwtHelper.getPublicAccessKey()

        verify(token, publicKey, (err) =>
            err ? res.status(401).json({status: 'unauthorized'}) : next());
    }


}
