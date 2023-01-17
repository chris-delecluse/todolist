import {NextFunction, Response} from "express";
import rateLimit, {RateLimitRequestHandler} from 'express-rate-limit'
import {TokenManager} from "../helpers/TokenManager";
import {IRequest} from "../models/IRequest";
import {IToken} from "../models/IToken";

/**
 * Class representing a middleware.
 */
export class Middleware {
    /**
     * A static variable for holding the rate limiter middleware.
     */
    static limiter: RateLimitRequestHandler = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 50,
        standardHeaders: true,
        legacyHeaders: false
    })

    /**
     * A static method for handling token authentication.
     * @param {IRequest} req - The custom request extending the Express request object.
     * @param {Response} res - The Express response object.
     * @param {NextFunction} next - The Express next function.
     */
    static authenticateToken = async (req: IRequest, res: Response, next: NextFunction) => {
        const tokenManager: TokenManager = new TokenManager()

        const token = tokenManager.getTokenFromHeaders(req)
        if (!token) return res.status(401).json({status: 'unauthorized'});

        try {
            const decoded = tokenManager.decodeAccessToken(token) as IToken

            if (tokenManager.isExpired(decoded)) return res.status(401).json({status: 'unauthorized'});

            req.user = decoded as IToken
            next()
        } catch (error) {
            res.status(401).json({status: 'unauthorized'});
        }
    }
}
