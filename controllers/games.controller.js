//Models
const { Console } = require('../models/console.model');
const { Game } = require('../models/game.model');
// const { Console } = require('../models/console.model');
const { gameInConsole } = require('../models/gameInConsole.model');

//utils
const { catchAsync } = require('../utils/catchAsync.utils');

const getAllGames = catchAsync(async (req, res, next) => {
    const games = await Game.findAll({
        where: { status: 'active' },
        include: Console,
    });

    res.status(200).json({
        status: 'success',
        games,
    });
});

const createGame = catchAsync(async (req, res, next) => {
    const { title, genre } = req.body;
    // const { sessionUser } = req;

    const newGame = await Game.create({
        title,
        genre,
    });

    res.status(201).json({
        status: 'success',
        newGame,
    });
});

const updateGame = catchAsync(async (req, res, next) => {
    const { game } = req;
    const { title } = req.body;

    await game.update({ title });
    res.status(204).json({ status: 'success' });
});

const deleteGame = catchAsync(async (req, res, next) => {
    const { game } = req;

    await game.update({ status: 'deleted' });

    res.status(204).json({ status: 'success' });
});

const assingConsoletoGame = catchAsync(async (req, res, next) => {
    const { gameId, consoleId } = req.body;

    const newGameInConsole = await gameInConsole.create({
        gameId,
        consoleId,
    });
    res.status(201).json({
        status: 'success',
        newGameInConsole,
    });
});

module.exports = {
    getAllGames,
    createGame,
    updateGame,
    deleteGame,
    assingConsoletoGame,
};
