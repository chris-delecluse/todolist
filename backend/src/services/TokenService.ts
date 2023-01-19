import { MongoRepository } from "typeorm";
import {Token} from "../entities/Token";
import {AppDataSource} from "../data-source";
import {User} from "../entities/User";

export class TokenService {
    private MongoRepository: MongoRepository<Token> = AppDataSource.getMongoRepository(Token)

    add = async (token: Token, user: User): Promise<void> => {
        await this.MongoRepository.insert({...token, userId: user.id})
    }

    getOne = async (token: string): Promise<Token | null> => {
        return await this.MongoRepository.findOneBy({token})
    }

    revoke = async (token: Token): Promise<void> => {
        await this.MongoRepository.update(token.id, {isRevoked: true})
    }

    // à changer
    deleteMany = async (timestamp: number): Promise<void> => {
        await this.MongoRepository.deleteMany({expires: timestamp > Date.now()});
    }
}
