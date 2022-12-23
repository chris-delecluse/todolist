import {Response} from "express";

export abstract class HttpResponse {
    static httpResponseMessage = (res: Response, statusCode: number, status: string, message: any) =>
        res.status(statusCode).json({status, message})
}
