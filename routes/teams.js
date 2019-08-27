var router = require('express').Router();
var teamsCtrl = require('../controllers/teams');


// create team page
router.get('/new', teamsCtrl.newTeam);
// team list 
router.get('/list', teamsCtrl.showAllTeams);
// post schedule
router.post('/:id/schedule', teamsCtrl.createSchedule);
// create team
router.post('/', teamsCtrl.createTeam);
// show team players page
router.get('/:id/players', teamsCtrl.showTeamPlayers);
// show team schedule page
router.get('/:id/schedule', teamsCtrl.showTeamSchedule);
//show edit team page
router.get('/:id/edit', teamsCtrl.editTeam);
//show team page- description
router.get('/:id', isLoggedIn, teamsCtrl.showTeam);


// router.get('/', isLoggedIn, teamsCtrl.index);
// router.get('/all', isLoggedIn, teamsCtrl.allTeams);
// router.get('/edit', teamsCtrl.editTeam);

// //create team page
// router.get('/new', teamsCtrl.newTeam);

// router.post('/', teamsCtrl.createTeam);

//edit team page
router.put('/:id', teamsCtrl.updateTeam);
//delete team schedule
router.delete('/:id', teamsCtrl.deleteSchedule);


// Insert this middleware for routes that require a logged in user
function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
}

module.exports = router;