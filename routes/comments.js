var router = require('express').Router();
var commentsCtrl = require('../controllers/teams');

router.post('/teams/comments/:id', commentsCtrl.createComment);


// Insert this middleware for routes that require a logged in user
function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
}

module.exports = router;