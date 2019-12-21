const userModel = require("./.././models/user");
const gameModel = require("./.././models/game");
const jwt = require("jsonwebtoken");
const config = require("../../config");

module.exports = {
    signUp: async ctx => {
        try {
            console.log(ctx.request.body);

            ctx.body = {
                message: await userModel.User.create(ctx.request.body),
                success: true
            };
        } catch (err) {
            ctx.status = 400;
            ctx.body = {
                message: err.errmsg,
                success: false
            };
        }
    },
    login: async ctx => {
        if (ctx.result) {
            const payload = {
                email : ctx.result.email,
                id: ctx.result._id
            };

            const token = jwt.sign(payload, config.jwtsecret, { expiresIn: "6h" });

            ctx.body = {
                success: true,
                id: ctx.result._id,
                message: "Welcome " + ctx.result.email,
                data: {
                    token: "JWT " + token
                }
            };
        } else {
            ctx.body = {
                message: "Login failed.",
                success: false
            };
        }
    },
    changePassword: async ctx => {
        try {
            // TODO: Fix this.
            const result = await userModel.User.findOne({_id: ctx.request.body._id});
            const changePassword = await result.setPassword(ctx.request.body.newPassword);

            console.log("change", changePassword);

            const updatedUser = await result.save();

            if(result){
                ctx.body = {
                    message: "password successfully updated",
                    success: true
                };
            }
        }
        catch (err) {
            ctx.status = 400;
            ctx.body = {
                message: err.errmsg,
                success: false
            };
        }
    },
    updateLocation: async ctx => {
        try{
            console.log("ctx.request.body", ctx.request.body);

            const user = await userModel.User.findOne({_id: ctx.params._id});

            if (!user) {
                ctx.body = {
                    message: "User can not be found.",
                    success: false
                };
                ctx.status = 400;
            } else {
                const result = await userModel.User.findOneAndUpdate(
                    {_id: ctx.params._id},
                    {$set: {location: ctx.request.body}},
                    {
                        upsert: true,
                        new: true
                    }
                );

                if (result) {
                    ctx.body = {
                        message: "User successfully updated.",
                        data: result,
                        success: true
                    };
                    ctx.status = 200;
                } else {
                    ctx.body = {
                        message: "User can not be updated.",
                        success: false
                    };
                    ctx.status = 400;
                }
            }

        }
        catch (err){
            ctx.status = 400;
            ctx.body = {
                message: err,
                success: false
            };
        }
    },
    getUserInfo: async ctx => {
        try{
            const user = await userModel.User.findOne({_id: ctx.params._id});

            if(!user){
                ctx.body = {
                    message: "User can not be found.",
                    success: false
                };
                ctx.status = 400;
            }
            else{
                let returnData = {};

                returnData.username = user.username;
                returnData.email = user.email;
                returnData.secretQuestion = user.secretQuestion;

                let history = [{}];

                let gameIds = user.gameIds;

                for(let i = 0; i < gameIds.length; i++){
                    let game = await gameModel.findOne({_id: gameIds[i]});
                    let gameInfo = {};

                    console.log("game", game);

                    gameInfo.gameCreateDate = game.createdDate;
                    gameInfo.gameTitle = game.title;

                    for(let j = 0; j < game.ranking.length; j++){
                        console.log("hi");
                        if(game.ranking[j] === user.username){
                            gameInfo.ranking = j+1;
                            gameInfo.score = game.scores[j];
                        }
                    }
                    history.push(gameInfo);
                }
                console.log(history);

                returnData.history = history;

                console.log("ret", returnData);

                ctx.body = {
                    message: "User info is read.",
                    data: returnData,
                    success: true
                };
                ctx.status = 200;
            }
        }
        catch(err){
            ctx.status = 400;
            ctx.body = {
                message: err,
                success: false
            };
        }
    },
    updateUserInfo: async ctx => {
        try{
            const user = await userModel.User.findOneAndUpdate({_id: ctx.params._id},
                ctx.request.body);

            if(!user){
                ctx.status = 400;
                ctx.body = {
                    message: "User can not be updated",
                    success: false
                };
            }
            else {
                ctx.status = 200;
                ctx.body = {
                    message: "User is updated",
                    success: true
                };
            }
        }
        catch(err){
            ctx.status = 400;
            ctx.body = {
                message: err,
                success: false
            };
        }
    }
};
