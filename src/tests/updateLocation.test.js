const request = require("supertest");
const app = require("../../index");
const dbConnection = require("../database/mongooseDatabase");


let userId;
let userToken;

describe('Login step for updateLocation endpoint test', () => {
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
        userToken = res.body.data.token
    })
});


describe('updateLocation endpoint test', () => {
    it('should updates location of yakup', async () => {
        const res = await request(app)
            .put('/update-location/' + userId)
            .send({
                "location": {
                    "latitude": 0.0,
                    "longitude": 0.0
                }
            })
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toEqual('User successfully updated.')
    })
});

afterAll(async done => {
    // Closing the DB connection allows Jest to exit successfully.
    dbConnection.connection.close();
    app.close();
    done();
});
