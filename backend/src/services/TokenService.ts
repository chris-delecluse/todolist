import {InsertResult, MongoRepository, UpdateResult} from "typeorm";
import {Token} from "../entities/Token";
import {AppDataSource} from "../data-source";

export class TokenService {
    private MongoRepository: MongoRepository<Token> = AppDataSource.getMongoRepository(Token)

    add = async (token: Token): Promise<InsertResult> => {
        return await this.MongoRepository.insert(token);
    }

    getOneByAccessToken = async (accessToken: string): Promise<Token | null> => {
        return await this.MongoRepository.findOneBy({accessToken})
    }

    updateAccessToken = async (accessToken: string, newAccessToken: string): Promise<UpdateResult> => {
        return await this.MongoRepository.update({accessToken}, {accessToken: newAccessToken})
    }
}
