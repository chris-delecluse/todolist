import supertest from "supertest";
import app from "../index";
import * as myMock from "./mock-data/mockUserRegister"

const req = supertest(app)

describe('testing user login', () => {
    it('should return [register user successfully]', async () => {
        const res = await req.post('/register').send(myMock.userToRegister)

        expect(res.status).toEqual(201)
        expect(res.body).toEqual({
            status: "success",
            message: "user register successfully"
        })
    })

    it('should login a user successfully', async () => {
        const res = await req.post('/login').send({
            email: "john@doe.com",
            password: "test123"
        })

        expect(res.status).toEqual(200)
        expect(res.body.status).toEqual("success")
        expect(res.body.results.expireIn).toEqual(1800000)
        expect(typeof res.body.results.token).toBe("string")
    });

    it('should return [please fill all fields] using empty body', async () => {
        const res = await req.post('/login').send({})

        expect(res.status).toEqual(400)
        expect(res.body).toEqual({
            status: "failed",
            message: "please fill all fields"

        })
    });

    it('should return [please fill all fields] using only email', async () => {
        const res = await req.post('/login').send({
            email: "john@doe.com",
        })

        expect(res.status).toEqual(400)
        expect(res.body).toEqual({
            status: "failed",
            message: "please fill all fields"
        })
    });

    it('should return [please fill all fields] using only password', async () => {
        const res = await req.post('/login').send({
            password: "test123"
        })

        expect(res.status).toEqual(400)
        expect(res.body).toEqual({
            status: "failed",
            message: "please fill all fields"
        })
    });
})
