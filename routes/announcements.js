var router = require('express').Router();
var announcementsCtrl = require('../controllers/teams');

router.post('/teams/announcements/add', announcementsCtrl.createAnnouncement);
router.get('/teams/announcements/:id', announcementsCtrl.showAnnouncement);
router.delete('/teams/announcements/:id', announcementsCtrl.deleteAnnouncement);


// Insert this middleware for routes that require a logged in user
function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
}

module.exports = router;