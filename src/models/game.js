const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameModel = new mongoose.Schema({
    name: {
        type: String,
        required: 'name of the game is required'
    },
    adminId: {
        type: Schema.Types.ObjectId, ref: 'Users',
        required: 'username of the game is required'
    },
    type: {
        type: String,
        required: 'game type is required'
    },
    location: {
        latitude: Number,
        longitude: Number,
        radius: Number
    },
    description: {
        type: String,
        required: 'game description is required'
    },
    hints: {
        hint: [String],
        hintSecret: [String]
    },
    deadline: {
        type: Date
    },
    gameLength: {
        type: Number
    },
    players: {
        type: [{type: Schema.Types.ObjectId, ref: 'Users'}],
        required: 'players of the game are required'
    },
    shareCode: {
        type: String
    },
    /*
    * saves user id of the player who submitted the qr
    * in order to calculate rankings when requested, on runtime
    */
    submittedQRs: {
        type: [String]
    },
    /*
     * calculates the rankings and stores it at the end of the game
     * in order to use in statistics.
     */
    ranking: {
        type: [String]
    },
    scores: {
        type: [String]
    },
    /*
     * "Created" -> "Being played" -> "Ended"
     */
    status: String
});

const game = mongoose.model('game', gameModel, 'games');

module.exports = game;
