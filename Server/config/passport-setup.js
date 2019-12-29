const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./keys")
const User = require("../models/user-models");


passport.serializeUser((user,done)=>{
      //Using the Unique Mongodb Id as Unique identifier
      done(null,user.id);
})

passport.deserializeUser((id,done)=>{
      //Using the Unique Mongodb Id as Unique identifier
      User.findById(id).then((user)=>{
            done(null,user);
      })
})


//tell passport which strategy we are going to use
passport.use(
      new GoogleStrategy({
            //remember to correct the URL while integration
            callbackURL : keys.google.callbackURL,
            clientID: keys.google.clientID,
            clientSecret : keys.google.clientSecret
      }
      ,(accessToken,refreshToken,profile,done)=>{
            //passport callback function
            //check If User already exits
            console.log(profile)
            User.findOne({googleId:profile.id}).then((ExistingUser)=>{
                  if(ExistingUser){
                        //User profile already exists
                        console.log("User already exists");
                        done(null,ExistingUser);
                  }
                  else{
                        var user =  new User({
                              username:profile.displayName,
                              googleId:profile.id,
                              thumbnail:profile._json.picture
                        });
                  //Saving the New User
                  user.save().then((newUser)=>{
                        console.log("New User Created");
                        console.log(newUser);
                        done(null,newUser);
                  })
                  }
            }).catch((err)=>
            {
                  console.log(err);
            })
       }
      )
)
