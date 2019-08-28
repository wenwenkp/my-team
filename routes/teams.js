var router = require('express').Router();
var teamsCtrl = require('../controllers/teams');

router.get('/', isLoggedIn, teamsCtrl.index);
router.get('/:id', teamsCtrl.showTeam);

router.put('/:id/matches', teamsCtrl.createMatch);
router.post('/:id/announcements', teamsCtrl.createAnnouncement);

router.put('/:id', teamsCtrl.updateTeam);

router.post('/', teamsCtrl.createTeam);


// Insert this middleware for routes that require a logged in user
function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
}

module.exports = router;