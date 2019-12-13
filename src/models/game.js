const mongoose = require('mongoose');

const gameModel = new mongoose.Schema({
    name: {
        type: String,
        required: 'name of the game is required'
    },
    username: {
        type: String,
        required: 'username of the game is required'
    },
    type: {
        type: String,
        required: 'game type is required'
    },
    location: {
        type: String,
        required: 'location of the game is required'
    },
    hints: {
        type: [String],
        required: 'hints for the game is required'
    },
    players: {
        type: [String],
        required: 'players of the game are required'
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
    /*
     * "Created" -> "Being played" -> "Ended"
     */
    status: String
});

const game = mongoose.model('game', gameModel, 'games');

module.exports = game;
