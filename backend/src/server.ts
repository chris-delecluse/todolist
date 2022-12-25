import express, {Express} from "express";
import {Middleware} from "./middlewares/Middleware";
import cors from "cors";

export class Server {
    private static app: Express

    static getServer = (): Express => {
        if (!Server.app) Server.app = express()

        try {
            Server.app.use(Middleware.limiter)
            Server.app.use(express.urlencoded({extended: true}))
            Server.app.use(express.json())
            Server.app.use(cors())
        } catch (error: any) {
            throw new Error(error)
        }

        return Server.app
    }
}
