import * as dotenv from "dotenv";
import supertest from "supertest";
import app from "../index";
import {AppDataSource} from "../data-source";
import sleep from "./helpers/sleep";
import * as myMockUserRegister from "./mockData/mockUserRegister"
import * as myMockUserLogin from "./mockData/mockUserLogin";

dotenv.config()
const req = supertest(app)

beforeAll(async () => {
    await AppDataSource.initialize()
    console.log(`database connection etablished on: ${process.env.NODE_ENV} environement`)
})

afterEach(async () => {
    await sleep(1000)
})

afterAll(async () => {
    await AppDataSource.destroy()
})

describe('testing user registration', () => {
    it('should return [register user successfully]', async () => {
        const res = await req.post('/register').send(myMockUserRegister.userToRegister)

        expect(res.status).toEqual(201)
        expect(res.body).toEqual({
            status: "success",
            message: "user register successfully"
        })
    })

    it('should login a user successfully and return a token', async () => {
        const res = await req.post('/login').send(myMockUserLogin.userToLogin)

        expect(res.status).toEqual(200)
        expect(res.body).toEqual({
            status: 'success',
        })
    });
})
