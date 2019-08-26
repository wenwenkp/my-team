var router = require('express').Router();
var teamsCtrl = require('../controllers/teams');


// create team page
router.get('/new', teamsCtrl.newTeam);
// team list 
router.get('/list', teamsCtrl.showAllTeams);
// create team
router.post('/', teamsCtrl.createTeam);
// show team players page
router.get('/:id/players', teamsCtrl.showTeamPlayers);
// show team schedule page
router.get('/:id/schedule', teamsCtrl.showTeamSchedule);
// show team announcements page
router.get('/:id/announcements', teamsCtrl.showTeamAnnouncements);
//show team page- description
router.get('/:id', teamsCtrl.showTeam);


// router.get('/', isLoggedIn, teamsCtrl.index);
// router.get('/all', isLoggedIn, teamsCtrl.allTeams);
// router.get('/edit', teamsCtrl.editTeam);

// //create team page
// router.get('/new', teamsCtrl.newTeam);

// router.post('/', teamsCtrl.createTeam);
// router.put('/:id', teamsCtrl.updateTeam);


// Insert this middleware for routes that require a logged in user
function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
}

module.exports = router;