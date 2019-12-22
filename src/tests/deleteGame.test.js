const request = require("supertest");
const app = require("../../index");
const dbConnection = require("../database/mongooseDatabase");


let userId;
let userToken;
let createdGameId;

describe('Login step for deleteGame endpoint test', () => {
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


describe('create endpoint test', () => {
    it('should create a game sucessfully', async () => {
        const res = await request(app)
            .post('/game')
            .send({
                "title": "Best Game Ever",
                "adminId": userId,
                "type": "Standard",
                "location": {
                  "latitude": 41.105399,
                  "longitude": 29.023522,
                  "radius": 1000
                },
                "description":"Find all the QRs",
                "hints": {
                    "hint": ["Somewhere around Expresso Lab", "Check EEB canteen", "An another usefull hint"],
                    "hintSecrets": ["595cdf23-4f84-43bc-9f53-9d79008a356e"	, "b363e30e-68ba-481e-a92e-05708cb79a3c","5e8f3b04-0c89-4938-8615-f7ade65cfddf"]
                },
                "gameLength": 50,
                "players": [userId],
                "status": "created"
            }).set({ Authorization: userToken})
        
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toEqual('Game successfully created.');
        createdGameId = res.body.data._id
    })
});

describe('DeleteGame endpoint test', () => {
    it('should recently created game', async () => {
        const res = await request(app)
            .delete('/delete/' + createdGameId)
            .setset({ Authorization: userToken})

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toEqual('Game successfully deleted.');
        userId = res.body.id;
        userToken = res.body.data.token
    })
});


afterAll(async done => {
    // Closing the DB connection allows Jest to exit successfully.
    dbConnection.connection.close();
    app.close();
    done();
});