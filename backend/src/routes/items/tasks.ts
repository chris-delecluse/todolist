import {TaskController} from "../../controller/TaskController";
import {IRoute} from "../../models/IRoute";
import {Middleware} from "../../middlewares/Middleware";

const taskController: TaskController = new TaskController();

export const tasks: IRoute[] = [
    {
        method: "POST",
        uri: "/tasks",
        middleware: [Middleware.jwt],
        action: taskController.addTask
    },
    {
        method: "PUT",
        uri: "/tasks",
        middleware: [Middleware.jwt],
        action: taskController.taskDone
    },
    {
        method: "GET",
        uri: "/currentTasks",
        middleware: [Middleware.jwt],
        action: taskController.getUserCurrentTasks
    },
    {
        method: "GET",
        uri: "/taskHistory",
        middleware: [Middleware.jwt],
        action: taskController.getUserTaskHistory
    }
];
