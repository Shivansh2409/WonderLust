const listing = require('../models/listing');
const review = require('../models/review');



module.exports.createReview = async (req, res) => {
    let listing1 = await listing.findById(req.params.id);
    let userID = req.user._id;
    let newReview= new review(req.body.review);
    newReview.author = userID;
    listing1.reviews.push(newReview);
    
    await listing1.save();
    await newReview.save();
    req.flash('success', 'Successfully added review');
    res.redirect(`/listings/${listing1._id}`);

}
module.exports.destroyReview=async (req, res) => {
    const { id, reviewId } = req.params;
    await listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review');
    res.redirect(`/listings/${id}`);
};