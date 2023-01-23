import {DeleteResult, DeleteWriteOpResultObject, InsertResult, MongoRepository, ObjectID, UpdateResult} from "typeorm";
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

    updateOne = async (oldToken: Token, newToken: Token): Promise<UpdateResult> => {
        return await this.MongoRepository.update(oldToken, newToken)
    }

    deleteOne = async (token: Token): Promise<DeleteResult> => {
        return await this.MongoRepository.delete(token)
    }

    deleteManyByUserId = async (userId: ObjectID): Promise<DeleteWriteOpResultObject> => {
        return await this.MongoRepository.deleteMany({userId: userId})
    }
}
