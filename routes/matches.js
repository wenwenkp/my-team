var router = require('express').Router();
var matchesCtrl = require('../controllers/teams');

router.post('/teams/matches/add', matchesCtrl.createMatch);

router.delete('/teams/matches/:id', isLoggedIn, matchesCtrl.deleteMatch);


// Insert this middleware for routes that require a logged in user
function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
}

module.exports = router;