const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config({ path: './config.env' });

//Models
const { User } = require('../models/user.model');
const { Review } = require('../models/review.model');

//utils
const { catchAsync } = require('../utils/catchAsync.utils');
const { AppError } = require('../utils/appError.utils');

dotenv.config({ path: './config.env' });

const getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.findAll({
        where: { status: 'active' },
        include: [{ model: Review }],
    });

    res.status(200).json({
        status: 'success',
        users,
    });
});

const createUser = catchAsync(async (req, res, next) => {
    const { name, email, password } = req.body;

    //Hashing password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    //Removing password from response
    newUser.password = undefined;

    res.status(201).json({
        status: 'success',
        newUser,
    });
});

const updateUser = catchAsync(async (req, res, next) => {
    const { user } = req;
    const { name, email } = req.body;

    await user.update({
        name,
        email,
    });

    res.status(204).json({ status: 'success' });
});

const deleteUser = catchAsync(async (req, res, next) => {
    const { user } = req;

    await user.update({ status: 'deleted' });

    res.status(204).json({ status: 'success' });
});

const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    //Validate email
    const user = await User.findOne({
        where: {
            email,
            status: 'active',
        },
    });

    //Validate User
    if (!user) {
        return next(new AppError('Credentials invalid', 400));
    }

    //Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return next(new AppError('Credentials invalid', 400));
    }

    //Generate JWT (Json Web Token)
    //Generate JWT_SIGN = node -> require('crypto').randomBytes(64).toString('hex')
    const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    //Send response
    res.status(200).json({
        status: 'success',
        token,
    });
});

module.exports = { getAllUsers, createUser, updateUser, deleteUser, login };
