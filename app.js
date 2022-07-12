const express = require('express');

//Routes
const { usersRouter } = require('./routes/users.routes');
const { gamesRouter } = require('./routes/games.routes');
const { consolesRouter } = require('./routes/consoles.routes');
const { reviewsRouter } = require('./routes/reviews.routes');

//Global error controller
const { globalErrorHandler } = require('./controllers/error.controller');

//Utils
const { AppError } = require('./utils/appError.utils');

const app = express();
app.use(express.json());

//Define enpoints
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/games', gamesRouter);
app.use('/api/v1/consoles', consolesRouter);
app.use('/api/v1/reviews', reviewsRouter);

app.all('*', (req, res, next) => {
    next(
        new AppError(
            `${req.method} ${req.originalUrl} not found on this server`,
            404
        )
    );
});

app.use(globalErrorHandler);

module.exports = { app };
