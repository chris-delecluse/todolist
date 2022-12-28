import "reflect-metadata";
import {DataSource} from "typeorm";
import * as dotenv from "dotenv";
import {User} from "./entities/User";
import {Tasks} from "./entities/Tasks";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mongodb",
    database: process.env.NODE_ENV != "test" ? process.env.DB_NAME : process.env.DB_NAME_TEST,
    synchronize: true,
    logging: ['query', 'error'],
    entities: [User, Tasks],
    subscribers: [],
    useUnifiedTopology: true
});
