const express = require('express');

//Controllers
const {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    login,
} = require('../controllers/users.controller');
const { userExists } = require('../middlewares/users.middleware');
const {
    protectSession,
    protectUserAccount,
} = require('../middlewares/auth.middleware');

const usersRouter = express.Router();

usersRouter.post('/signup', createUser);

usersRouter.post('/login', login);

usersRouter.use(protectSession);

usersRouter.get('/', getAllUsers);

usersRouter
    .use('/:id', userExists)
    .route('/:id')
    .patch(protectUserAccount, updateUser)
    .delete(protectUserAccount, deleteUser);

module.exports = { usersRouter };
