import { User }          from "../entities/User";
import { AppDataSource } from "../data-source";
import { Repository }    from "typeorm";

export class UserService {
    private _repository: Repository<User> = AppDataSource.getRepository(User);

    getOneByEmail = async (email: string): Promise<User | null> => await this._repository.findOneBy({email});

    add = async (user: User): Promise<void> => {
        await this._repository.insert(user);
    };
}
