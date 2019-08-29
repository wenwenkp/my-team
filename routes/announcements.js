var router = require('express').Router();
var announcementsCtrl = require('../controllers/teams');

router.get('/announcements/:id', isLoggedIn, announcementsCtrl.showAnnouncement);
router.delete('/announcements/:id', isLoggedIn, announcementsCtrl.deleteAnnouncement);


// Insert this middleware for routes that require a logged in user
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/google');
}

module.exports = router;