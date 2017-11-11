const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();

//set view engine
app.set('view engine', 'ejs');

app.use(cookieSession({
    keys:[keys.session.cookieKey],
    maxAge: 24*60*60*1000
}));

//initialize passport in the application
app.use(passport.initialize())
// use passport.session to controle our logging in
app.use(passport.session())

//connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log('Connected to mongodb')
})

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.get('/', (req, res) => {
    res.render('home', {user: req.user})
})

app.listen(3000, () => {
    console.log('listening to port 3000')
})