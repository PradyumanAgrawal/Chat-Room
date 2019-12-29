const router = require('express').Router();
const passport= require("passport")  

//auth login
router.get("/login",(req,res)=>{
      res.render("login");
});

//auht logout
router.get("/logout",(req,res)=>{
      req.logout();
      res.redirect("/home");
});

//auth with google
router.get("/google" , passport.authenticate ('google', {
      //to specify the api what information we need
      scope : ["profile"]
}));

//redirect URL for Google Login
router.get("/google/redirect", passport.authenticate('google') ,(req,res)=>{
      res.redirect("/profile/")

});

module.exports=router;
