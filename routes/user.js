const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapasync = require("/Users/gargi/Documents/Major Project/utils/wrapasync.js");
const passport = require("passport");
const {saveRedirectUrl}= require("../middleware.js");
const userContoller= require("../contollers/user.js");


router.get("/signup", userContoller.renderSignupForm);

router.post("/signup",wrapasync(userContoller.signup));


router.get("/login",userContoller.renderLoginForm)


router.post("/login",saveRedirectUrl,passport.authenticate("local",{failureRedirect: '/login' ,failureFlash:true}),userContoller.login );

router.get("/logout",userContoller.logout);


module.exports=router;