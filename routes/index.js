var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'My Team' });
});

router.get('/auth/google', passport.authenticate(
  'google',
  {socpe:['profile', 'email']}
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/index',
    failureRedirect: '/index'
  }
));

router.get('/logout', (req, res)=>{
  req.logout();
  res.redirect('index');
});

module.exports = router;
