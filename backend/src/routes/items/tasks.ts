import { TaskController } from "../../controller/TaskController";
import { IRoute } from "../../models/IRoute";
import { Middleware } from "../../middlewares/Middleware";

const taskController: TaskController = new TaskController();

export const tasks: IRoute[] = [
	{
		method: "post",
		uri: "/tasks",
		middleware: [Middleware.authenticateToken],
		handler: taskController.addTask
	},
	{
		method: "put",
		uri: "/tasks",
		middleware: [Middleware.authenticateToken],
		handler: taskController.taskDone
	},
	{
		method: "get",
		uri: "/task/current",
		middleware: [Middleware.authenticateToken],
		handler: taskController.getUserCurrentTasks
	},
	{
		method: "get",
		uri: "/task/history",
		middleware: [Middleware.authenticateToken],
		handler: taskController.getUserTaskHistory
	}
];
