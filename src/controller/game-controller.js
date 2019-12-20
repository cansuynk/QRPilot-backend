const gameModel = require("../models/game");
const randomize = require('randomatic');

module.exports = {
    createGame: async ctx => {
        try {
            const shareCode = randomize('Aa0', 5);

            let gameData = ctx.request.body;
            gameData.shareCode = shareCode;

            const result = await gameModel.create(gameData);

            if (!result) {
                ctx.body = {
                    message: "Game can not be created.",
                    success: false
                };
                ctx.status = 400;
            } else {
                console.log(result);
                ctx.body = {
                    message: "Game successfully created.",
                    success: true,
                    data: result
                };
                ctx.status = 200;
            }
        }
        catch (err) {
            console.log(err);
            ctx.status = 400;
            ctx.body = {
                message: err,
                success: false
            };
        }
    },
    joinGame: async ctx => {
        try {
            const result = await gameModel.findOne({shareCode: ctx.params.shareCode});

            if (!result) {
                ctx.body = {
                    message: "Game can not be found.",
                    success: false
                };
                ctx.status = 400;
            } else {
                ctx.body = {
                    message: "Game successfully found.",
                    data: result,
                    success: true
                };
                ctx.status = 200;
            }
        }
        catch (err){
            console.log(err);
            ctx.status = 400;
            ctx.body = {
                message: err,
                success: false
            };
        }
    },
    readGame: async ctx => {
       try {
           const result = await gameModel.findOne({_id: ctx.params._id});

           if (!result) {
               ctx.body = {
                   message: "Game can not be found.",
                   success: false
               };
               ctx.status = 400;
           } else {
               ctx.body = {
                   message: "Game successfully found.",
                   data: result,
                   success: true
               };
               ctx.status = 200;
           }
       }
       catch (err){
           console.log(err);
           ctx.status = 400;
           ctx.body = {
               message: err,
               success: false
           };
       }
    },
    updateGame: async ctx => {
        try {
            const result = await gameModel.findOne({_id: ctx.params._id});

            if (!result) {
                ctx.body = {
                    message: "Game can not be found.",
                    success: false
                };
                ctx.status = 400;
            } else {
                const result2 = await gameModel.findOneAndUpdate(
                    {_id: ctx.params._id},
                    ctx.request.body,
                    {
                        upsert: true,
                        new: true
                    }
                );

                if (result2) {
                    ctx.body = {
                        message: "Game successfully updated.",
                        data: result,
                        success: true
                    };
                    ctx.status = 200;
                } else {
                    ctx.body = {
                        message: "Game can not be updated.",
                        success: false
                    };
                    ctx.status = 400;
                }
            }
        }
        catch (err) {
            console.log(err);
            ctx.status = 400;
            ctx.body = {
                message: err,
                success: false
            };
        }
    },
    deleteGame: async ctx => {
        try {
            const result = await gameModel.findOneAndRemove({_id: ctx.params._id});

            if (!result) {
                ctx.body = {
                    message: "Game can not be deleted.",
                    success: false
                };
                ctx.status = 400;
            } else {
                ctx.body = {
                    message: "Game successfully deleted.",
                    success: true
                };
                ctx.status = 200;
            }
        }
        catch(err) {
            console.log(err);
            ctx.status = 400;
            ctx.body = {
                message: err,
                success: false
            };
        }
    },
};
