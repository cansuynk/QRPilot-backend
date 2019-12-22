const request = require("supertest");
const app = require("../../index");
const dbConnection = require("../database/mongooseDatabase");

let userId;
let userToken;

describe('Login step for getUserInfo endpoint test', () => {
    it('should login with username: burak, password: burak', async () => {
        const res = await request(app)
            .post('/login')
            .send({
                username: "burak",
                password: "burak",
            })
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toEqual('Welcome burak');
        userId = res.body.id;
        userToken = res.body.data.token
    })
});

describe('getUserInfo endpoint test', () => {
    it('should fetch user information of the user Burak ', async () => {
        const res = await request(app)
            .get('/user/' + "1")
            .set({ Authorization: userToken})

        console.log(res.body);
        expect(res.statusCode).toEqual(400);
        expect(res.body.success).toBe(false);
    })
});

afterAll(async done => {
    // Closing the DB connection allows Jest to exit successfully.
    dbConnection.connection.close();
    app.close();
    done();
});
