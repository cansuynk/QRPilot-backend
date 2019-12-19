const request = require("supertest");
const app = require("../../index");
const dbConnection = require("../database/mongooseDatabase");

let userId;

describe('Login endpoint test', () => {
    it('should login with username: yakup, password: yakup', async () => {
        const res = await request(app)
            .post('/login')
            .send({
                username: "yakup",
                password: "yakup",
            })
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toEqual('Welcome yakup');
        userId = res.body.id;
    })
});

afterAll(async done => {
    // Closing the DB connection allows Jest to exit successfully.
    dbConnection.connection.close();
    app.close();
    done();
});

