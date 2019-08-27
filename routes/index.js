var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', (req, res)=>{
  res.render('index', {user: req.user});
});

router.get('/auth/google', passport.authenticate(
  'google',
  { scope:['profile', 'email'] }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/members',
    failureRedirect: '/members'
  }
));

router.get('/logout', (req, res)=>{
  req.logout();
  res.redirect('/');
});

module.exports = router;
