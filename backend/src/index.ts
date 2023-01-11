import "reflect-metadata"
import * as dotenv from "dotenv";
import {Server} from "./server";
import {AppDataSource} from "./data-source";
import {routes} from "./routes";

dotenv.config();

const port = process.env.PORT;
const app = Server.getServer();

(async () => {
    for await (const route of routes) {
        app[route.method](route.uri, route.middleware, route.handler);
    }
})()

if (process.env.NODE_ENV != "test") {
    AppDataSource.initialize()
        .then(() => console.log('connection with database etablished'))
        .catch((err) => console.log(err))

    app.listen(port, () => console.log(`server listen on: http://localhost:${port}`));
}

export default app;
