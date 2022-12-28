import {Request, Response} from "express";
import {Tasks} from "../entities/Tasks";
import {User} from "../entities/User";
import {JsonWebToken} from "../helpers/JsonWebToken";
import {HttpTask} from "../http-response-messages/HttpTask";
import {IToken} from "../models/IToken";
import {TaskService} from "../services/TaskService";
import {UserService} from "../services/UserService";
import {HttpAuthentication} from "../http-response-messages/HttpAuthentication";

export class TaskController {
    private _jwtHelper: JsonWebToken;
    private _tastService: TaskService;
    private _userService: UserService;

    constructor() {
        this._jwtHelper = new JsonWebToken()
        this._tastService = new TaskService()
        this._userService = new UserService()
    }

    getUserCurrentTasks = async (req: Request, res: Response): Promise<Response> => {
        const token: string | undefined = this._jwtHelper.getFromHeaders(req)

        const userToken = this._jwtHelper.decode(token!) as IToken

        const user: User | null = await this._userService.getOneByEmail(userToken.email)
        const listOfCurrentTasks = await this._tastService.getCurrentTasks(user!)

        if (!user) return HttpAuthentication.userNotFound(res)
        if (!listOfCurrentTasks?.length) return HttpTask.noTaskFound(res)

        return res
            .status(200)
            .json({
                status: 'success',
                results: listOfCurrentTasks
            })
    }

    getUserTaskHistory = async (req: Request, res: Response): Promise<Response> => {
        const token: string | undefined = this._jwtHelper.getFromHeaders(req)

        const userToken = this._jwtHelper.decode(token!) as IToken

        const user: User | null = await this._userService.getOneByEmail(userToken.email)
        const listOfTaskHistory = await this._tastService.getTaskDone(user!)

        if (!user) return HttpAuthentication.userNotFound(res)
        if (!listOfTaskHistory?.length) return HttpTask.noTaskFound(res)

        return res
            .status(200)
            .json({
                status: 'success',
                results: listOfTaskHistory
            })
    }

    addTask = async (req: Request, res: Response): Promise<Response> => {
        const {task} = req.body

        if (!task) return HttpTask.missingParameters(res, "task")

        const token: string | undefined = this._jwtHelper.getFromHeaders(req)
        const decodedToken = this._jwtHelper.decode(token!) as IToken

        const user: User | null = await this._userService.getOneByEmail(decodedToken.email)

        if (!user) return HttpAuthentication.userNotFound(res)

        const taskToStore: Tasks = new Tasks()
        taskToStore.task = task
        taskToStore.userId = user.id

        await this._tastService.add(taskToStore)

        return res
            .status(201)
            .json({
                status: 'success',
                message: 'task added successfully'
            })
    }

    taskDone = async (req: Request, res: Response): Promise<Response> => {
        const {taskId} = req.body

        if (!taskId) return HttpTask.missingParameters(res, "taskId")

        const task: Tasks | null = await this._tastService.getOne(taskId)

        if (!task) return HttpTask.noTaskFound(res)

        await this._tastService.updateDoneField(task.id)

        return res
            .status(200)
            .json({
                status: 'success',
                message: 'task updated successfully'
            })
    };
}
