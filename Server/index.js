const express = require('express');
const bodyParser = require('body-parser');
const authRoutes=require("./routes/auth-routes")
const profileRoutes=require("./routes/profile-routes")

const app = express();
//to kick start passport-setup.js file
const passportSetup = require("./config/passport-setup")
const User = require("./models/user-models");
const keys = require("./config/keys")
const mongoose =require("mongoose")
const cookieSession = require('cookie-session')
const passport=require('passport')

// set view engine
//this has to be modified as i was using Ejs as view engine for the demo
app.set('view engine', 'ejs');

//setting the properties for the cookie
app.use(cookieSession({
  maxAge:7*24*60*60*1000,
  keys:[keys.session.cookieKey]
}));

//intialize passport
app.use(passport.initialize());
app.use(passport.session());

try {
  //Connecting to mongodb
  mongoose.connect(keys.mongodb.dbURI,{ useUnifiedTopology: false ,useNewUrlParser: true }, ()=>{
      console.log("Connected to Mongodb");
  });
}    catch (e) {
  console.error(e);
}

app.use(bodyParser.urlencoded({ extended: false }));


//This whole here is for the demo and needs to be modified
    //set up authRoutes
    app.use('/auth',authRoutes);
    //set up profieRoutes
    app.use('/profile',profileRoutes);

    // create home route
    app.get('/home', (req, res) => {
        res.render('home.ejs',{user:req.user});

    });

app.get('/api/greeting', (req, res) => {
  res.send(`backend connected`);
});


//For Authentication to run properly You must have 3000 as the port
//Because As of now the redirect URL specified to google api is localhost:3000/auth/google/redirect
app.listen(3000, () =>
  console.log('Express server is running on localhost:3001')
);