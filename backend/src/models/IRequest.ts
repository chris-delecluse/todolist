import {Request} from "express";
import {IToken} from "./IToken";

export interface IRequest extends Request {
    user?: IToken
    token?: string
}
