import * as dotenv from "dotenv";
import supertest from "supertest";
import app from "../index";
import {AppDataSource} from "../data-source";
import sleep from "./utils/sleep";

dotenv.config()
const req = supertest(app)

beforeAll(async () => {
    await AppDataSource.initialize()
    console.log(`database connection etablished on: ${process.env.NODE_ENV} environement`)
})

afterEach(async () => {
    await sleep(100)
})

afterAll(async () => {
    await AppDataSource.destroy()
})

describe('testing user registration', () => {
    const firstname: string = "john"
    const lastname: string = "doe"
    const email: string = "test@gmail.com"
    const password: string = "123azZe"

    const wrongShorTName: string = "te"
    const wrongLongName: string = "azertyuiopqsdfghjklmw"
    const wrongPasswordOne: string = "azer"
    const wrongPasswordTwo: number = 123
    const wrongEmailOne: string = "azeezadsf"
    const wrongEmailTwo: string = "azeaze.com"
    const wrongEmailTree: string = "zaeeaz@gmail.azettdsgf"

    it('should return [register user successfully]', async () => {
        const res = await req.post('/register').send({
            firstname, lastname, email, password
        })

        expect(res.status).toEqual(201)
        expect(res.body).toEqual({
            status: "success",
            message: "user register successfully"
        })
    })

    it('should return [user already exist]', async () => {
        const res = await req.post('/register').send({
            firstname, lastname, email, password
        })

        expect(res.status).toEqual(409)
        expect(res.body).toEqual({
            status: "failed",
            message: "user already exist"
        })
    })

    it('should return [please enter a firstname]', async () => {
        const res = await req.post('/register').send({
            lastname, email, password
        })

        expect(res.status).toEqual(400)
        expect(res.body).toEqual({
            status: 'failed',
            message: 'please enter a firstname'
        })
    })

    it('should return [please enter a lastname]', async () => {
        const res = await req.post('/register').send({
            firstname, email, password
        })

        expect(res.status).toEqual(400)
        expect(res.body).toEqual({
            status: 'failed',
            message: 'please enter a lastname'
        })
    })

    it('should return [please enter a email]', async () => {
        const res = await req.post('/register').send({
            firstname, lastname, password
        })

        expect(res.status).toEqual(400)
        expect(res.body).toEqual({
            status: 'failed',
            message: 'please enter a email'
        })
    })

    it('should return [please enter a password]', async () => {
        const res = await req.post('/register').send({
            firstname, lastname, email
        })

        expect(res.status).toEqual(400)
        expect(res.body).toEqual({
            status: 'failed',
            message: 'please enter a password'
        })
    })

    it('should return [first name must content a least 3 char min and 20 max][SHORT (2 char)]', async () => {
        const res = await req.post('/register').send({
            firstname: wrongShorTName, lastname, email, password
        })

        expect(res.status).toEqual(400)
        expect(res.body).toEqual({
            status: 'failed',
            message: 'first name must content a least 3 char min and 20 max'
        })
    })

    it('should return [first name must content a least 3 char min and 20 max][LONG(21 char)]', async () => {
        const res = await req.post('/register').send({
            firstname: wrongLongName, lastname, email, password
        })

        expect(res.status).toEqual(400)
        expect(res.body).toEqual({
            status: 'failed',
            message: 'first name must content a least 3 char min and 20 max'
        })
    })
})
