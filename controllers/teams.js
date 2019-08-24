var Teams = require('../models/team');
var Players = require('../models/player');

module.exports = {
    index,
    newTeam,
    createTeam,
    showTeam,
    createAnnouncement,
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

    Players.findById(req.user.id, (err, p)=>{
        p.teamId = newTeam.id;
        p.isLeader = true;
        p.save();
        res.render('players/index', {
            user: p,
            team:newTeam
        })
    })
}

function showTeam(req, res, next) {
    Teams.findById(req.params.id).populate('players').exec((err, team)=>{
        res.render('teams/show', {
            user: req.user,
            team,
        })
    })
}

function createAnnouncement(req, res, next) {
    Teams.findById(req.user.teamId).populate('players').exec((err, team)=>{
        team.announcements.push(req.body);
        team.save();
        res.render('teams/show', {
            user: req.user,
            team
        });
    })
}