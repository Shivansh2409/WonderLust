// Major_1/models/listing.js
const { required, number } = require('joi');
const mongoose = require('mongoose');
const { type } = require('os');
const schema = mongoose.Schema;
const listingSchema = new schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    images: {
        url: String,
        filename: String
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now  
    },
    
    country: {
        type: String,
        required: true
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    geometry:{
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
    }
    
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;