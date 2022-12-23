import {Response} from "express";
import {HttpResponse} from "./HttpResponse";

export class HttpUser extends HttpResponse {
    static noUserFirstname = async (res: Response): Promise<Response> =>
        await this.httpResponseMessage(res, 400, 'failed', 'please enter a firstname')

    static noUserLastname = async (res: Response): Promise<Response> =>
        await this.httpResponseMessage(res, 400, 'failed', 'please enter a lastname')

    static noUserEmail = async (res: Response): Promise<Response> =>
        await this.httpResponseMessage(res, 400, 'failed', 'please enter a email')

    static noUserPassword = async (res: Response): Promise<Response> =>
        await this.httpResponseMessage(res, 400, 'failed', 'please enter a password')
}
