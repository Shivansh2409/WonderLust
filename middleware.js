const listing = require('./models/listing');
const { listingSchema,reviewSchema} = require('./schema.js');
const expreeError = require('./utils/ExpressError.js');
const review = require('./models/review');


module.exports.isLoggedIn= (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl || '/listings';
        req.flash('error', 'You must be signed in to create a listing');
        return res.redirect('/login');
    }
    next();
}
module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
        
    }
    next();
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const listing1 = await listing.findById(id);
    if (!(listing1.owner.equals(req.user._id))) {
        // throw new expressError(404, "Listing not found");
        req.flash('error', 'You do not have permission to do that');
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validationListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(',');
        throw new expreeError(400, msg);
    }
    next();
}

module.exports.validationReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(',');
        throw new expreeError(400, msg);
    }
    next();
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review1 = await review.findById(reviewId);
    if (!(review1.author.equals(req.user._id))) {
        // throw new expressError(404, "Listing not found");
        req.flash('error', 'You do not have permission to do that');
        return res.redirect(`/listings/${id}`);
    }
    next();
}