var router = require('express').Router();
var announcementsCtrl = require('../controllers/teams');

router.post('/teams/announcements/add', isLoggedIn, announcementsCtrl.createAnnouncement);
router.get('/teams/announcements/:id', isLoggedIn, announcementsCtrl.showAnnouncement);


// Insert this middleware for routes that require a logged in user
function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
}

module.exports = router;