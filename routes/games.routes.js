const express = require('express');

//controllers
const {
    getAllGames,
    createGame,
    deleteGame,
    updateGame,
    assingConsoletoGame,
} = require('../controllers/games.controller');
const { gameExists } = require('../middlewares/games.middleware');

const { protectSession } = require('../middlewares/auth.middleware');

const gamesRouter = express.Router();

gamesRouter.get('/', getAllGames);

gamesRouter.post('/', protectSession, createGame);

gamesRouter.post('/assign-console', assingConsoletoGame);

gamesRouter.patch('/:id', gameExists, protectSession, updateGame);

gamesRouter.delete('/:id', gameExists, protectSession, deleteGame);

module.exports = { gamesRouter };
