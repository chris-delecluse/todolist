import "reflect-metadata";
import {DataSource} from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(String(process.env.DB_PORT)),
    database: process.env.NODE_ENV != "test" ? process.env.DB_NAME : process.env.DB_NAME_TEST,
    dropSchema: true,
    migrationsRun: true,
    synchronize: true,
    logging: false,
    entities: ['src/entities/*.ts'],
    migrations: ['src/migrations/*.ts'],
    subscribers: []
});
