const request = require("supertest");
const app = require("../../index");
const dbConnection = require("../database/mongooseDatabase");

let userId;
let userToken;


describe('Login step for changePassword endpoint test', () => {
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


describe('changePassword endpoint test', () => {
    it('should change password of the "burak"', async () => {
        const res = await request(app)
            .put('/changePassword')
            .send({
                "_id": userId,
	            "newPassword": "burak"
            }).set({ Authorization: userToken})
            
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toEqual('password successfully updated');
        userId = res.body.id;
        userToken = res.body.data.token
    })
});

