const { request } = require('http');
const listing = require('../models/listing.js');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken= process.env.MAP_API_KEY;
const baseClient = mbxGeocoding({ accessToken: mapToken });


module.exports.index=async (req, res) => {
    const listings = await listing.find({});
    res.render('listing/index.ejs', { listings });
}
module.exports.renderNewForm=async(req, res) => {
    res.render('./listing/new.ejs');
};
module.exports.showListing=async (req, res) => {
    const { id } = req.params;
    const listing1 = await listing.findById(id).populate({path:'reviews',populate:{path:'author'}}).populate("owner");
    if (!listing1) {
        // throw new expressError(404, "Listing not found");
        req.flash('error', 'Listing not found');
        return res.redirect('/listings');
    }
    
    res.render('./listing/show.ejs', { listing1 });
};
module.exports.createListing=async (req, res) => {

    const responce=await baseClient
        .forwardGeocode({
          query: req.body.location + ", " + req.body.country,
          limit: 1
        })
    .send();
    
    
    
    // console.log(result);
    // if (result.error) {
    //     throw new expressError(400, result.error.details[0].message);
    // }
    const imgurl = req.file.path;
    const imgfilename = req.file.filename;
    const { title, description, price, location, country } = req.body;
    const listing1 = new listing({
        title: title,
        description: description,
        price: price,
        location: location,
        country: country,
        owner: req.user._id
    });
    listing1.images = {
        url: imgurl,
        filename: imgfilename
    };
    listing1.geometry=responce.body.features[0].geometry;
    await listing1.save();
    req.flash('success', 'Successfully created a new listing!');
    res.redirect('/listings');
};
module.exports.renderEditForm=async (req, res) => {
    const { id } = req.params;
    const listing1 = await listing.findById(id);
    let lowImage=listing1.images.url.replace('/upload','/upload/h_300,c_fill');
    res.render('./listing/edit.ejs', { listing1, lowImage });
};
module.exports.updateListing=async (req, res) => {
    const { id } = req.params;
    const { title, description, price, location, country } = req.body;
    
    const listing1 = await listing.findByIdAndUpdate(id, {
        title: title,
        description: description,
        price: price,
        location: location,
        country: country
    });
    if(typeof req.file !== 'undefined'){
        const imgurl = req.file.path;
        const imgfilename = req.file.filename;
        listing1.images = {
            url: imgurl,
            filename: imgfilename
        };
    }
    await listing1.save();
    req.flash('success', 'Successfully updated the listing!');
    res.redirect(`/listings/${id}`);
};
module.exports.destroyListing=async (req, res) => {
    const { id } = req.params;
    await listing.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted the listing!');
    res.redirect('/listings');
};