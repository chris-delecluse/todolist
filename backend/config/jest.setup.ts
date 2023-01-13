import {AppDataSource} from "../src/data-source";
import sleep from "../src/__tests__/helpers/sleep";

beforeAll(async () => {
    await AppDataSource.initialize()
    console.log(`database connection established on: ${process.env.NODE_ENV} environment`)
})

afterEach(async () => {
    await sleep(200)
})

afterAll(async () => {
    await AppDataSource.dropDatabase()
    console.log(`database cleaned`)

    await sleep(2000)

    await AppDataSource.destroy()
    console.log(`database closed`)
})
