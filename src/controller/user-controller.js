const userModel = require("./.././models/user");
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

            console.log(ctx.request.body);
            const result = await userModel.User.findOne({_id: ctx.request.body._id});

            console.log("result", result);

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
    }
};
