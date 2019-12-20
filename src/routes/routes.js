const userController = require("../controller/user-controller");
const gameController = require("../controller/game-controller");
const statisticsController = require("../controller/statistics-controller");
const jwtAuth = require("./.././middleware/jwtAuth");
const jwtLocal = require("./.././middleware/jwtLocal");

module.exports = ({router}) => {
    router
        .post('/signUp', userController.signUp)
        .post('/login', jwtLocal, userController.login)
        .put('/changePassword', userController.changePassword)

        .post('/game', jwtAuth, gameController.createGame)
        .get('/join-game/:shareCode', jwtAuth, gameController.joinGame)
        .get('/game/:_id', jwtAuth, gameController.readGame)
        .delete('/game/:_id', jwtAuth, gameController.deleteGame)
        .put('/game/:_id', jwtAuth, gameController.updateGame)

        /*
         * creates a new statistics, only username is required
         */
        .post('/statistics', jwtAuth, statisticsController.createStatistics)
        /*
         * finds statistics with username and returns it
         */
        .get('/statistics', jwtAuth, statisticsController.getStatistics)
        /*
         * finds statistics with username and updates it using the
         * rest of the values on the request body
         */
        .put('/statistics', jwtAuth, statisticsController.editStatistics)
};
