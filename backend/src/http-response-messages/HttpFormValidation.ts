import { Response } from "express";
import { HttpResponse } from "./HttpResponse";

export class HttpFormValidation extends HttpResponse {
	static invalidFirstnameField = async (res: Response): Promise<Response> =>
		await this.httpResponseMessage(res, 400, 'failed', 'first name must content a least 3 char min and 20 max')

	static invalidLastnameField = async (res: Response): Promise<Response> =>
		await this.httpResponseMessage(res, 400, 'failed', 'last name must content a least 3 char min and 20 max')

	static invalidPasswordField = async (res: Response): Promise<Response> =>
		await this.httpResponseMessage(res, 400, 'failed', 'password must content 5 char and at least one number')

	static invalidEmailField = async (res: Response): Promise<Response> =>
		await this.httpResponseMessage(res, 400, 'failed', 'please enter a valid email')
}
