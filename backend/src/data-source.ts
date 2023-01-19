import "reflect-metadata";
import {DataSource} from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mongodb",
    url: process.env.MONGO_URI,
    database: process.env.NODE_ENV != "test" ? process.env.DB_NAME : process.env.DB_NAME_TEST,
    synchronize: true,
    logging: ['query', 'error'],
    entities: ["./src/entities/*.ts"],
    subscribers: [],
    useUnifiedTopology: true
});
