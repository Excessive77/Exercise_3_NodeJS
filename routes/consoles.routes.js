const express = require('express');

//controllers
const {
    getAllConsoles,
    createConsole,
    updateConsole,
    deleteConsole,
} = require('../controllers/consoles.controller');
const { consoleExists } = require('../middlewares/consoles.middleware');

const { protectSession } = require('../middlewares/auth.middleware');

const consolesRouter = express.Router();

consolesRouter.get('/', getAllConsoles);

consolesRouter.post('/', protectSession, createConsole);

consolesRouter
    .use('/:id', consoleExists)
    .route('/:id')
    .patch(protectSession, updateConsole)
    .delete(protectSession, deleteConsole);

module.exports = { consolesRouter };
