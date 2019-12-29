const router = require('express').Router();


//We need to add this checking facility in the real frontend file
//custom middleware to check if user is Logged in or not
const authCheck=(req,res,next)=>{
    if(req.user){
        next();
    }
    else{
        //if user not logged in
        //needs modifications
        res.redirect("/auth/login");
    }

}

//Needs modification
router.get("/",authCheck,(req,res)=>{
    //Sending the user details to Profile template keep a note
    res.render("profile",{user:req.user})
})

module.exports=router;