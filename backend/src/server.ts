import express, { Express } from "express";
import { Middleware } from "./middlewares/Middleware";
import cors from "cors";

export class Server {
	private static app: Express
	private static _middlewareList: any[] = [
		Middleware.limiter,
		express.urlencoded({ extended: true }),
		express.json(),
		cors()
	]

	static getServer = (): Express => {
		if (!Server.app) Server.app = express()

		try {
			this._middlewareList.forEach(middleware => Server.app.use(middleware))
		} catch (error: any) {
			throw new Error(error)
		}

		return Server.app
	}
}
