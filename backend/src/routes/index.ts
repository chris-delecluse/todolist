import { IRoute } from "../models/IRoute";
import { authentication } from "./items/authentication";
import { tasks } from "./items/tasks";

export const routes: IRoute[] = [
	...authentication,
	...tasks
];
