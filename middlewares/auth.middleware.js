const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

//Utils
const { catchAsync } = require('../utils/catchAsync.utils');
const { AppError } = require('../utils/appError.utils');

//Models
const { User } = require('../models/user.model');
dotenv.config({ path: './config.env' });

const protectSession = catchAsync(async (req, res, next) => {
    let token;
    //Extract token from headers
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        //Bearer token
        // [Bearer, token]
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new AppError('Invalid session token', 403));
    }

    //Ask JWT (Library), if the token is still valid
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({
        where: { id: decoded.id, status: 'active' },
    });

    if (!user) {
        return next(
            new AppError('The owner of this token dosent exists already', 403)
        );
    }

    req.sessionUser = user;
    next();
});

const protectUserAccount = (req, res, next) => {
    const { sessionUser, user } = req;

    if (sessionUser.id !== user.id) {
        return next(new AppError('You cant modify this account', 403));
    }
};

module.exports = { protectSession, protectUserAccount };
