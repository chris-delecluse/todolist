import "reflect-metadata"
import * as dotenv from "dotenv";
import {routes} from "./routes";
import {Server} from "./server";
import {AppDataSource} from "./data-source";

dotenv.config();

const port = process.env.PORT;
const app = Server.getServer();

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

if (process.env.NODE_ENV != "test") {
    AppDataSource.initialize()
        .then(() => console.log('connection with database etablished'))
        .catch((err) => console.log(err))

    app.listen(port, () => console.log(`server listen on: http://localhost:${port}`));
}

export default app;
