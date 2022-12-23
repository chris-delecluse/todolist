import "reflect-metadata"
import app from "./server";
import {AppDataSource} from "./data-source";
import {routes} from "./routes";
import express from "express";
import cors from "cors";
import {Middleware} from "./middlewares/Middleware";

AppDataSource.initialize().then(() => console.log("Database initialized"));

app.use(Middleware.limiter)
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

(async () => {
    for await (const route of routes) {
        switch (route.method) {
            case "GET":
                app.get(route.uri, route.middleware, route.action);
                break;
            case "POST":
                app.post(route.uri, route.middleware, route.action);
                break;
            case "DELETE":
                app.delete(route.uri, route.middleware, route.action);
                break;
            case "PUT":
                app.put(route.uri, route.middleware, route.action);
                break;
            default :
                console.error("Cannot access this request");
        }
    }
})();
