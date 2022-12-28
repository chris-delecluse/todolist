import {AppDataSource} from "../data-source";
import {getMongoRepository, MongoRepository, ObjectID, Repository} from "typeorm"
import {Tasks} from "../entities/Tasks";
import {User} from "../entities/User";

export class TaskService {
    private _repository: MongoRepository<Tasks> = AppDataSource.getMongoRepository(Tasks)

    getCurrentTasks = async (user: User): Promise<Tasks[] | null> => {
        return await this._repository.findBy({userId: user.id, done: false})
    }

    getTaskDone = async (user: User): Promise<Tasks[] | null> => {
        return await this._repository.findBy({userId: user.id, done: true})
    }

    getOne = async (id: ObjectID): Promise<Tasks | null> => {
        return await this._repository.findOneBy(id)
    }

    add = async (task: Tasks): Promise<void> => {
        await this._repository.insert(task)
    }

    updateDoneField = async (taskId: ObjectID): Promise<void> => {
        await this._repository.update(taskId, {done: true})
    }
}

