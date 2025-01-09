const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapasync.js");
const ExpressError = require("../utils/ExpressError.js");
const{ reviewSchema } = require("../schema.js");
const Review = require("/Users/gargi/Documents/Major Project/models/reviews.js");
const Listing = require("/Users/gargi/Documents/Major Project/models/listing.js");
const {validateReview,isLoggedIn,isAuthor} = require("/Users/gargi/Documents/Major Project/middleware.js")
const ReviewContoller= require("../contollers/review.js");



//Review Route
router.post("/",isLoggedIn,validateReview,wrapAsync( ReviewContoller.postReview));


//Delete Review Route
router.delete("/:reviewId" ,isLoggedIn,isAuthor, wrapAsync(ReviewContoller.deleteReview));

module.exports=router;