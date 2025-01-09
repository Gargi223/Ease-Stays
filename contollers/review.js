const Review = require("/Users/gargi/Documents/Major Project/models/reviews.js");
const Listing = require("/Users/gargi/Documents/Major Project/models/listing.js");


module.exports.postReview=async(req,res)=>{

    let listing =await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author= req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "New Review Created!");
   
    res.redirect(`/listings/${listing._id}`);
    
};


module.exports.deleteReview=async(req,res)=>{
    let {id, reviewId} = req.params;
    await Review.findByIdAndDelete(reviewId);
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    req.flash("success", " Review Deleted!"); 
    res.redirect(`/listings/${id}`);

};


