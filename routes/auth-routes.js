const router = require('express').Router();
const passport = require('passport');

// auth login
router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

// auth logout
router.get('/logout', (req, res) => {
    // handle with passport
    req.logout();
    res.redirect('/');
});

// auth with google+
// the scope is what we want to retrieve from the user's google account. 
// in this case it is the the profile information.
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}))


// callback route for google to redirect to
// NOW YOU HAVE ACCESS TO THE USER IN THE req parameter
router.get('/google/redirect',passport.authenticate('google'),(req,res) => {
    res.redirect('/profile/')
})

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
router.get('/facebook', passport.authenticate('facebook', {scope: ['email']}));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/profile', failureRedirect: '/login' }));

module.exports = router;