import {AppDataSource} from "../data-source";
import {Repository} from "typeorm"
import {Tasks} from "../entities/Tasks";
import {User} from "../entities/User";

export class TaskService {
    private _repository: Repository<Tasks> = AppDataSource.getRepository(Tasks)

    getCurrentTasks = async (user: User): Promise<Tasks[] | null> => {
        return await this._repository.findBy({user, done: false})
    }

    getTaskDone = async (user: User): Promise<Tasks[] | null> => {
        return await this._repository.findBy({user, done: true})
    }

    getOne = async (id: string): Promise<Tasks | null> => {
        return await this._repository.findOneBy({id})
    }

    add = async (task: Tasks): Promise<void> => {
        await this._repository.insert(task)
    }

    updateDoneField = async (taskId: string): Promise<void> => {
        await this._repository.update(taskId, {done: true})
    }
}
