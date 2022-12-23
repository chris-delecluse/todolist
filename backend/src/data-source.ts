import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { User }    from "./entities/User";
import {Tasks} from "./entities/Tasks";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(String(process.env.DB_PORT)),
    database: process.env.DB_NAME,
    dropSchema: true,
    migrationsRun: true,
    synchronize: true,
    logging: false,
    entities: ['src/entities/*.ts'],
    migrations: ['src/migrations/*.ts'],
    subscribers: []
});
