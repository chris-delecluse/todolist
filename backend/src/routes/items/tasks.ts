import {TaskController} from "../../controller/TaskController";
import {IRoute} from "../../models/IRoute";
import {Middleware} from "../../middlewares/Middleware";

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
        uri: "/currentTasks",
        middleware: [Middleware.authenticateToken],
        handler: taskController.getUserCurrentTasks
    },
    {
        method: "get",
        uri: "/taskHistory",
        middleware: [Middleware.authenticateToken],
        handler: taskController.getUserTaskHistory
    }
];
