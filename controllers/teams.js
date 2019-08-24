var Teams = require('../models/team');
var Players = require('../models/player');

module.exports = {
    index,
    newTeam,
    createTeam,
};

function index(req, res, next) {
    Teams.find({}, (err, teams)=>{
        res.render('teams/index', {
            user: req.user,
            teams
        })
    })
}
function newTeam(req, res, next) {
    res.render('teams/new', {
        user: req.user
    });
}
function createTeam(req, res, next) {
    var newTeam = new Teams(req.body);
    newTeam.save();
    newTeam.players.push(req.user.id);
    newTeam.leader = req.user.name;

    user = req.user;
    user.teamId = newTeam.id;
    user.isLeader = true;

    res.render('players/index', {
        user,
        player: user,
        team: newTeam
    });
}