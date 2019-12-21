const request = require("supertest");
const app = require("../../index");
const dbConnection = require("../database/mongooseDatabase");
const userModel = require("./.././models/user");

describe('Signup endpoint test', () => {
    it('should sign up with username: test, password: test, email: test, secretQuestion: test, secretAnswer: test', async () => {
        const res = await request(app)
            .post('/signUp')
            .send({
                username: "test",
                email: "test",
                password: "test",
                secretQuestion: "test",
                secretAnswer: "test"
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message.email).toEqual('test');
        expect(res.body.message.username).toEqual('test');
        expect(res.body.message.secretAnswer).toEqual('test');
        expect(res.body.message.secretQuestion).toEqual('test');
    })
});

describe('Login endpoint fail case', () => {
    it('should not sign up with username: test', async () => {
        const res = await request(app)
            .post('/signUp')
            .send({
                username: "",
            });
        console.log("ressss", res.body);
        expect(res.statusCode).toEqual(400);
        expect(res.body.success).toBe(false);
    })
});

afterAll(async done => {
    // Closing the DB connection allows Jest to exit successfully.
    const testUser = await userModel.User.findOneAndRemove({username: "test"});

    dbConnection.connection.close();
    app.close();
    done();
});
