const express = require('express');
const router = express.Router({mergeParams: true});
const warpAsync = require('../utils/WrapAsync.js');
const {validationReview, isReviewAuthor} = require('../middleware.js');
const { isLoggedIn } = require('../middleware.js');
const reviewController=require("../controllers/reviews.js")



//review page
//post review
router.post('/',isLoggedIn,validationReview,warpAsync(reviewController.createReview));

//delete review
router.delete('/:reviewId', isLoggedIn,isReviewAuthor,warpAsync(reviewController.destroyReview));

module.exports = router;