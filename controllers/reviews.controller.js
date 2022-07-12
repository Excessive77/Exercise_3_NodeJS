//Models
const { Game } = require('../models/game.model');
const { Review } = require('../models/review.model');
const { User } = require('../models/user.model');

//utils
const { catchAsync } = require('../utils/catchAsync.utils');

const getAllReviews = catchAsync(async (req, res, next) => {
    const reviews = await Review.findAll({
        where: { status: 'active' },
        include: [{ model: User }, { model: Game }],
    });

    res.status(200).json({
        status: 'success',
        reviews,
    });
});

const createReview = catchAsync(async (req, res, next) => {
    const { userId, gameId, comment } = req.body;

    const newReview = await Review.create({
        userId,
        gameId,
        comment,
    });

    res.status(201).json({
        status: 'success',
        newReview,
    });
});

const updateReview = catchAsync(async (req, res, next) => {
    const { review } = req;

    await review.update({ comment });
    res.status(204).json({
        status: 'success',
    });
});

const deleteReview = catchAsync(async (req, res, next) => {
    const { review } = req;

    await review.update({ status: 'deleted' });

    res.status(204).json({ status: 'success' });
});

module.exports = { getAllReviews, createReview, updateReview, deleteReview };
