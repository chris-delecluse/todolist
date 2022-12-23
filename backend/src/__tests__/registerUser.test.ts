import * as chai from "chai";
import chaiHttp from "chai-http";
import {Response} from "express";
import {request} from "chai";
import app from "../server";

chai.use(chaiHttp)

test('should add', async () => {
    const res = await request('http://localhost:3099')
        .post('/register')
        .set('content-type', 'application/json')
        .send({firstname: 'azeeza', lastname: 'aezaeaze', email: 'email@email.com', password: '12aZEE'})

    console.log(res.body)

    expect(res.status).toBe(201)
})
