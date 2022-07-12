//Models
const { Console } = require('../models/console.model');
const { Game } = require('../models/game.model');

//utils
const { catchAsync } = require('../utils/catchAsync.utils');

const getAllConsoles = catchAsync(async (req, res, next) => {
    const consoles = await Console.findAll({
        where: { status: 'active' },
        include: Game,
    });

    res.status(200).json({
        status: 'success',
        consoles,
    });
});

const createConsole = catchAsync(async (req, res, next) => {
    const { name, company } = req.body;

    const newConsole = await Console.create({
        name,
        company,
    });

    res.status(201).json({
        status: 'success',
        newConsole,
    });
});

const updateConsole = catchAsync(async (req, res, next) => {
    const { console } = req;
    const { name } = req.body;

    await console.update({ name });
    res.status(204).json({ status: 'success' });
});

const deleteConsole = catchAsync(async (req, res, next) => {
    const { console } = req;

    await console.update({ status: 'deleted' });

    res.status(204).json({ status: 'success' });
});

module.exports = {
    getAllConsoles,
    createConsole,
    updateConsole,
    deleteConsole,
};
