import {Response} from "express";
import {HttpResponse} from "./HttpResponse";

export class HttpAuthError extends HttpResponse {
    static loginMissingField = async (res: Response): Promise<Response> =>
        await this.httpResponseMessage(res, 400, 'failed', 'please fill all fields')

    static loginIncorrectData = async (res: Response): Promise<Response> =>
        await this.httpResponseMessage(res, 401, 'failed', 'please fill the correct data')

    static userAlreadyExist = async (res: Response): Promise<Response> =>
        await this.httpResponseMessage(res, 409, 'failed', 'user already exist')

    static userNotFound = async (res: Response): Promise<Response> =>
        await this.httpResponseMessage(res, 404, 'failed', 'not found')

    static invalidToken = async (res: Response): Promise<Response> =>
        await this.httpResponseMessage(res, 401, 'failed', 'invalid token')

    static tokenExpired = async (res: Response): Promise<Response> =>
        await this.httpResponseMessage(res, 401, 'failed', 'token expired')

    static noTokenProvided = async (res: Response): Promise<Response> =>
        await this.httpResponseMessage(res, 401, 'failed', 'no token provided')

    static unauthorized = async (res: Response): Promise<Response> =>
        await this.httpResponseMessage(res, 401, 'failed', 'unauthorized')
}
