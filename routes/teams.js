var router = require('express').Router();
var teamsCtrl = require('../controllers/teams');

router.get('/', isLoggedIn, teamsCtrl.index);
router.get('/edit', teamsCtrl.editTeam);
router.get('/new', teamsCtrl.newTeam);
router.get('/:id', isLoggedIn, teamsCtrl.showTeam);

router.post('/', isLoggedIn, teamsCtrl.createTeam);
router.put('/:id', isLoggedIn, teamsCtrl.updateTeam);


// Insert this middleware for routes that require a logged in user
function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
}

module.exports = router;