const express = require('express');
const router = express.Router();
const listing=require('../models/listing');
const warpAsync = require('../utils/WrapAsync.js');
const {isLoggedIn,isAuthor,validationListing} = require('../middleware.js');
const listingcontroller = require('../controllers/listings.js');

const multer = require('multer');
const { storage } = require('../cloudConfig.js');
const upload = multer({ storage });



//listings page
router.get('/', warpAsync(listingcontroller.index));



//new listing page
router.get('/new',isLoggedIn ,warpAsync(listingcontroller.renderNewForm));


//show  page
router.get('/:id', warpAsync(listingcontroller.showListing));


//create listing
router.post('/',isLoggedIn,validationListing, upload.single('images'),warpAsync(listingcontroller.createListing));


//edit listing page
router.get('/:id/edit',isLoggedIn, isAuthor,warpAsync(listingcontroller.renderEditForm));

router.put('/:id',isLoggedIn,isAuthor,upload.single('images'), warpAsync(listingcontroller.updateListing));  

//delete listing
router.delete('/:id', isLoggedIn,isAuthor,warpAsync(listingcontroller.destroyListing));


module.exports = router;