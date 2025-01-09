const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapasync.js");
const{listingSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("/Users/gargi/Documents/Major Project/models/listing.js");
const {isLoggedIn, isOwner,validateListing} = require("../middleware.js")
const User = require('../models/user');
const listingContoller= require("../contollers/listing.js");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })



//Index Route
router.get("/",wrapAsync( listingContoller.index ));


// new route
router.get("/new", isLoggedIn ,listingContoller.renderNewForm);

// Show route
router.get("/:id", wrapAsync(listingContoller.showAllListing ));



//create route
router.post("/", isLoggedIn ,validateListing,wrapAsync( listingContoller.createNewListing));

//edit route
router.get("/:id/edit", isLoggedIn , isOwner, validateListing, wrapAsync( listingContoller.editListing));

//update Route
router.put("/:id", isLoggedIn ,isOwner, validateListing, wrapAsync(  listingContoller.updateListing));


//delete route
router.delete("/:id", isLoggedIn ,isOwner, wrapAsync( listingContoller.deleteListing ));

module.exports = router;