import {Request, Response} from "express";

export interface IRoute {
    method: string;
    uri: string;
    middleware: any[];
    action: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
}
