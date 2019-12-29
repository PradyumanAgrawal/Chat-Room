const router = require('express').Router();

//custom middleware to check if user is Logged in or not
const authCheck=(req,res,next)=>{
    if(req.user){
        next();
    }
    else{
        //if user not logged in
        res.redirect("/auth/login");
    }

}

router.get("/",authCheck,(req,res)=>{
    //Sending th euser details to Profile template
    res.render("profile",{user:req.user})
})

module.exports=router;