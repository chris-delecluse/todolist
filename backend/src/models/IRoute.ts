import {Request, Response} from "express";

export interface IRoute {
    method: "get" | "post" | "put" | "delete" | "patch" | "options" | "head";
    uri: string;
    middleware: any[];
    handler: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
}
