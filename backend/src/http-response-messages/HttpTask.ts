import {Response} from "express";
import {HttpResponse} from "./HttpResponse";

export class HttpTask extends HttpResponse {
    static missingParameters = async (res: Response, field: string): Promise<Response> =>
        await this.httpResponseMessage(res, 400, 'failed', `please fill the field [${field}]`)

    static noTaskFound = async (res: Response): Promise<Response> =>
        await this.httpResponseMessage(res, 404, 'failed', 'no task was found')
}
