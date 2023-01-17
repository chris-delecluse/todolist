import {Request, Response} from "express";
import {Tasks} from "../entities/Tasks";
import {User} from "../entities/User";
import {HttpTask} from "../http-response-messages/HttpTask";
import {IToken} from "../models/IToken";
import {TaskService} from "../services/TaskService";
import {UserService} from "../services/UserService";
import {HttpAuthentication} from "../http-response-messages/HttpAuthentication";
import {IRequest} from "../models/IRequest";

/**
 * TaskController handles the routing for all task-related routes.
 */
export class TaskController {
    private _taskService: TaskService;
    private _userService: UserService;

    constructor() {
        this._taskService = new TaskService()
        this._userService = new UserService()
    }

    /**
     * Retrieves the current tasks for a user.
     * @param req - Express request object that includes the user.
     * @param res - Express response object to send the task list or error message.
     * @returns Returns a response object with the current tasks or an error message.
     */
    getUserCurrentTasks = async (req: IRequest, res: Response): Promise<Response> => {
        const decodedUser = req.user as IToken;

        const user: User | null = await this._userService.getOneByEmail(decodedUser.email)
        const listOfCurrentTasks = await this._taskService.getCurrentTasks(user!)

        if (!user) return HttpAuthentication.userNotFound(res)
        if (!listOfCurrentTasks?.length) return HttpTask.noTaskFound(res)

        return res
            .status(200)
            .json({
                status: 'success',
                results: listOfCurrentTasks
            })
    }

    /**
     * Retrieves the task history for a user.
     * @param req - Express request object that includes the user.
     * @param res - Express response object to send the task list or error message.
     * @returns Returns a response object with the task history or an error message.
     */
    getUserTaskHistory = async (req: IRequest, res: Response): Promise<Response> => {
        const decodedUser = req.user as IToken;

        const user: User | null = await this._userService.getOneByEmail(decodedUser.email)
        const listOfTaskHistory = await this._taskService.getTaskDone(user!)

        if (!user) return HttpAuthentication.userNotFound(res)
        if (!listOfTaskHistory?.length) return HttpTask.noTaskFound(res)

        return res
            .status(200)
            .json({
                status: 'success',
                results: listOfTaskHistory
            })
    }

    /**
     * Adds a new task for a user.
     * @param req - Express request object that includes the user and task information.
     * @param res - Express response object to send a success message or error message.
     * @returns Returns a response object with a success message or an error message.
     */
    addTask = async (req: IRequest, res: Response): Promise<Response> => {
        const decodedUser = req.user as IToken
        const task = req.body

        if (!task) return HttpTask.missingParameters(res, "task")

        const user: User | null = await this._userService.getOneByEmail(decodedUser.email)

        if (!user) return HttpAuthentication.userNotFound(res)

        const taskToStore: Tasks = new Tasks()
        taskToStore.task = task
        taskToStore.userId = user.id

        await this._taskService.add(taskToStore)

        return res
            .status(201)
            .json({
                status: 'success',
                message: 'task added successfully'
            })
    }

    /**
     * Marks a task as done.
     * @param req - Express request object that includes the taskId.
     * @param res - Express response object to send a success message or error message.
     * @returns Returns a response object with a success message or an error message.
     */
    taskDone = async (req: Request, res: Response): Promise<Response> => {
        const {taskId} = req.body

        if (!taskId) return HttpTask.missingParameters(res, "taskId")

        const task: Tasks | null = await this._taskService.getOne(taskId)

        if (!task) return HttpTask.noTaskFound(res)

        await this._taskService.updateDoneField(task.id)

        return res
            .status(200)
            .json({
                status: 'success',
                message: 'task updated successfully'
            })
    };
}
