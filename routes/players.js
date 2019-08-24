var router = require('express').Router();
var playersCtrl = require('../controllers/players');

// GET /players
router.get('/', isLoggedIn, playersCtrl.index);

router.get('/edit', playersCtrl.editPlayer);
router.put('/', playersCtrl.updatePlayer);

router.put('/leave', playersCtrl.leaveTeam);

router.put('/join', playersCtrl.joinTeam);

// Insert this middleware for routes that require a logged in user
function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
}

module.exports = router;
