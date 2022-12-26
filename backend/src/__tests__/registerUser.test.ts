import * as dotenv from "dotenv";
import supertest from "supertest";
import app from "../index";
import {AppDataSource} from "../data-source";
import sleep from "./helpers/sleep";
import {
    userToRegister,
    userWithMissingEmail,
    userWithMissingFirstname,
    userWithMissingLastname,
    userWithMissingPassword, userWithWrongEmailOne, userWithWrongEmailTree, userWithWrongEmailTwo,
    userWithWrongLongFirstname,
    userWithWrongLongLastname, userWithWrongPasswordOne, userWithWrongPasswordTree, userWithWrongPasswordTwo,
    userWithWrongShortFirstname,
    userWithWrongShortLastname
} from "./mockData/mockUserRegister";

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
    it('should return [register user successfully]', async () => {
        const res = await req.post('/register').send(userToRegister)

        expect(res.status).toEqual(201)
        expect(res.body).toEqual({
            status: "success",
            message: "user register successfully"
        })
    })

    it('should return [user already exist]', async () => {
        const res = await req.post('/register').send(userToRegister)

        expect(res.status).toEqual(409)
        expect(res.body).toEqual({
            status: "failed",
            message: "user already exist"
        })
    })

    it('should return [please enter a firstname]', async () => {
        const res = await req.post('/register').send(userWithMissingFirstname)

        expect(res.status).toEqual(400)
        expect(res.body).toEqual({
            status: 'failed',
            message: 'please enter a firstname'
        })
    })

    it('should return [please enter a lastname]', async () => {
        const res = await req.post('/register').send(userWithMissingLastname)

        expect(res.status).toEqual(400)
        expect(res.body).toEqual({
            status: 'failed',
            message: 'please enter a lastname'
        })
    })

    it('should return [please enter a email]', async () => {
        const res = await req.post('/register').send(userWithMissingEmail)

        expect(res.status).toEqual(400)
        expect(res.body).toEqual({
            status: 'failed',
            message: 'please enter a email'
        })
    })

    it('should return [please enter a password]', async () => {
        const res = await req.post('/register').send(userWithMissingPassword)

        expect(res.status).toEqual(400)
        expect(res.body).toEqual({
            status: 'failed',
            message: 'please enter a password'
        })
    })

    it('should return [first name must content a least 3 char min and 20 max] using short mock first name less 2 char', async () => {
        const res = await req.post('/register').send(userWithWrongShortFirstname)

        expect(res.status).toEqual(400)
        expect(res.body).toEqual({
            status: 'failed',
            message: 'first name must content a least 3 char min and 20 max'
        })
    })

    it('should return [first name must content a least 3 char min and 20 max] using long mock first name than 20 char', async () => {
        const res = await req.post('/register').send(userWithWrongLongFirstname)

        expect(res.status).toEqual(400)
        expect(res.body).toEqual({
            status: 'failed',
            message: 'first name must content a least 3 char min and 20 max'
        })
    })

    it('should return [last name must content a least 3 char min and 20 max] using short mock last name less 2 char', async () => {
        const res = await req.post('/register').send(userWithWrongShortLastname)

        expect(res.status).toEqual(400)
        expect(res.body).toEqual({
            status: 'failed',
            message: 'last name must content a least 3 char min and 20 max'
        })
    })

    it('should return [last name must content a least 3 char min and 20 max] using long mock last name than 20 char', async () => {
        const res = await req.post('/register').send(userWithWrongLongLastname)

        expect(res.status).toEqual(400)
        expect(res.body).toEqual({
            status: 'failed',
            message: 'last name must content a least 3 char min and 20 max'
        })
    })

    it('should return [please enter a valid email] using an simple string', async () => {
        const res = await req.post('/register').send(userWithWrongEmailOne)

        expect(res.status).toEqual(400)
        expect(res.body).toEqual({
            status: 'failed',
            message: 'please enter a valid email'
        })
    })

    it('should return [please enter a valid email] using an email with a missing @', async () => {
        const res = await req.post('/register').send(userWithWrongEmailTwo)

        expect(res.status).toEqual(400)
        expect(res.body).toEqual({
            status: 'failed',
            message: 'please enter a valid email'
        })
    })

    it('should return [please enter a valid email] using an email with a missing dot', async () => {
        const res = await req.post('/register').send(userWithWrongEmailTree)

        expect(res.status).toEqual(400)
        expect(res.body).toEqual({
            status: 'failed',
            message: 'please enter a valid email'
        })
    })

    it('should return [password must content 5 char and at least one number] using an password with missing number', async () => {
        const res = await req.post('/register').send(userWithWrongPasswordOne)

        expect(res.status).toEqual(400)
        expect(res.body).toEqual({
            status: 'failed',
            message: 'password must content 5 char and at least one number'
        })
    })

    it('should return [password must content 5 char and at least one number] using an password with missing char', async () => {
        const res = await req.post('/register').send(userWithWrongPasswordTwo)

        expect(res.status).toEqual(400)
        expect(res.body).toEqual({
            status: 'failed',
            message: 'password must content 5 char and at least one number'
        })
    })

    it('should return [password must content 5 char and at least one number] using an password less 5 char', async () => {
        const res = await req.post('/register').send(userWithWrongPasswordTree)

        expect(res.status).toEqual(400)
        expect(res.body).toEqual({
            status: 'failed',
            message: 'password must content 5 char and at least one number'
        })
    })
})
