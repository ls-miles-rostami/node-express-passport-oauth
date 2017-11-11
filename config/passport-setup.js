const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy = require('passport-facebook').Strategy;
const keys = require('./keys')
const User = require('../models/user-model')

//Here we want to serialize the id of that user into a cookie for the browser
//the user.id in this function represents the user id in our database
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// When the browser comes back to us with the serialized user id
// we want to deserialize it and retrieve the user id corresponding to that user
passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user)
    })
})

passport.use(
    new GoogleStrategy({
        // options for google strategy - here you put your google credentials
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToke, refreshToken, profile, done) => {
        // passport callback function - here is where you insert you user into the db using the 'profile' argument
        // console.log(profile)
        //Here you can also check if that user already exist in your database based on any criteria.
        User.findOne({googleId: profile.id}).then((currentUser) => {
            if(currentUser){
                //Already have a user
                console.log('User is: ' + currentUser)
                done(null, currentUser)
           }else{
               // if not create user in our db
               new User({
                username: profile.displayName,
                googleId: profile.id,
                thumbnail: profile._json.image.url
            })
            .save()
            .then(function(newUser){
                console.log('new user created! ', newUser)
                done(null, newUser)
            })
           }
        })
    })
);

passport.use(
    new FacebookStrategy({
        clientID: keys.facebook.appID,
        clientSecret: keys.facebook.appSecret,
        callbackURL: 'http://localhost:3000/auth/facebook/callback'
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOne({facebookId: profile.id}).then((currentUser) => {
            if(currentUser){
                //Already have a user
                console.log('User is: ' + currentUser)
                done(null, currentUser)
           }else{
               // if not create user in our db
               new User({
                username: profile.displayName,
                provider: profile.provider,
                facebookId: profile._json.id
            })
            .save()
            .then(function(newUser){
                console.log('new user created! ', newUser)
                done(null, newUser)
            })
           }
        })
      })
);
 