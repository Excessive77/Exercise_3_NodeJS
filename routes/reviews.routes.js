const express = require('express');

//Controllers
const {
    getAllReviews,
    createReview,
    updateReview,
    deleteReview,
} = require('../controllers/reviews.controller');

const { reviewExists } = require('../middlewares/reviews.middleware');

const reviewsRouter = express.Router();

reviewsRouter.get('/', getAllReviews);

reviewsRouter.post('/', createReview);

reviewsRouter
    .use('/:id', reviewExists)
    .route('/:id')
    .patch(updateReview)
    .delete(deleteReview);

module.exports = { reviewsRouter };
