var router = require('express').Router();
var playersCtrl = require('../controllers/players');

router.get('/', isLoggedIn, playersCtrl.index);

router.put('/leave', isLoggedIn, playersCtrl.leaveTeam);
router.put('/join', isLoggedIn, playersCtrl.joinTeam);
router.put('/', isLoggedIn, playersCtrl.updatePlayer);

router.post('/', playersCtrl.newAvatar);

// Insert this middleware for routes that require a logged in user
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/google');
}

module.exports = router;
