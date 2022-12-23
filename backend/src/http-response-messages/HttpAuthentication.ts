import {Response} from "express";
import {HttpResponse} from "./HttpResponse";

export class HttpAuthentication extends HttpResponse {
    static loginMissingField = async (res: Response): Promise<Response> =>
        await this.httpResponseMessage(res, 400, 'failed', 'please fill all fields')

    static loginIncorrectData = async (res: Response): Promise<Response> =>
        await this.httpResponseMessage(res, 401, 'failed', 'please fill the correct data')

    static userAlreadyExist = async (res: Response): Promise<Response> =>
        await this.httpResponseMessage(res, 409, 'failed', 'user already exixt')

    static userNotFound = async (res: Response): Promise<Response> =>
        await this.httpResponseMessage(res, 404, 'failed', 'not found')
}
