const mongoose = require("mongoose");
const Reviews = require("./reviews.js");
const Schema = mongoose.Schema;
const User = require('../models/user.js'); 

const listingSchema = Schema({
    title: {
        type: String,
        required: true,
    },  
    description: String,
    image: {
        // filename: String,
        // url:String,
        default:"https://unsplash.com/photos/photo-of-brown-bench-near-swimming-pool-Koei_7yYtIo",
        type: Object,
        set: (v)=> v===" "?"https://unsplash.com/photos/photo-of-brown-bench-near-swimming-pool-Koei_7yYtIo":v,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type:Schema.Types.ObjectId,
            ref: "Review",
        },
    ],

    owner:{
        type:Schema.Types.ObjectId,
        ref: "User",
    },
});


listingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing) {
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
});


const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;