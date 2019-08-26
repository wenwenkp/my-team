var router = require('express').Router();
var membersCtrl = require('../controllers/members');

// user profile
router.get('/', isLoggedIn, membersCtrl.index);
// user/managers page
router.get('/manager', isLoggedIn, membersCtrl.showManagerTeam);
//user/players page
router.get('/player', isLoggedIn, membersCtrl.showPlayerTeam);
// join team route
router.put('/join', membersCtrl.joinTeam);

// router.get('/all', isLoggedIn, membersCtrl.allPlayers);
// router.get('/edit', membersCtrl.editPlayer);

// router.put('/leave', membersCtrl.leaveTeam);
// router.put('/join', membersCtrl.joinTeam);
// router.put('/', membersCtrl.updatePlayer);


// Insert this middleware for routes that require a logged in user
function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
}

module.exports = router;
