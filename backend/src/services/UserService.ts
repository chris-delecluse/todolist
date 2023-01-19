import {User} from "../entities/User";
import {AppDataSource} from "../data-source";
import {MongoRepository} from "typeorm";

export class UserService {
    private _repository: MongoRepository<User> = AppDataSource.getMongoRepository(User);

    getOneByEmail = async (email: string): Promise<User | null> => {
        return await this._repository.findOneBy({email});
    }

    getOneById = async (id: string): Promise<User | null> => {
        return await this._repository.findOneBy(id);
    }

    add = async (user: User): Promise<void> => {
        await this._repository.insert(user)
    };
}
