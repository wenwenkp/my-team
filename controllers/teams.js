var Teams = require('../models/team');
var Players = require('../models/player');
var formidable = require("formidable");
var fs = require("fs");

module.exports = {
    index,
    createTeam,
    showTeam,
    updateTeam,
    createAnnouncement,
    deleteAnnouncement,
    showAnnouncement,
    showMatch,
    createMatch,
    deleteMatch,
    createComment,
    newLogo,
};

function index(req, res, next) {
    Teams.find({}, (err, teams) => {
        res.render('teams/index', {
            user: req.user,
            teams
        })
    })
}

function createTeam(req, res, next) {
    var form = new formidable.IncomingForm();
    if (req.upload) {
        form.parse(req, (error, fields, files) => {
            fs.writeFileSync(`public/images/teams-avatar/${files.upload.name}`, fs.readFileSync(files.upload.path));
            var newTeam = new Teams(fields);
            newTeam.save();
            newTeam.logo = `/images/teams-avatar/${files.upload.name}`;
        })
    } else {
        var newTeam = new Teams(req.body);
        newTeam.save();
        newTeam.logo = `/images/default-team-logo.jpg`;
    };
    newTeam.players.push(req.user.id);
    newTeam.leader = req.user.name;
    Players.findById(req.user.id, (err, p) => {
        p.teamId = newTeam.id;
        p.isLeader = true;
        p.save();
        res.redirect('/players');
    })
}

function showTeam(req, res, next) {
    Teams.findById(req.params.id).populate('players').exec((err, team) => {
        console.log(req.params.id);
        res.render('teams/show', {
            user: req.user,
            team,
        })
    })
}

function updateTeam(req, res, next) {
    Teams.findByIdAndUpdate(req.params.id, req.body).populate('players').exec((err, team) => {
        res.redirect(`/teams/${team.id}`)
    })
}

function createAnnouncement(req, res, next) {
    Teams.findById(req.user.teamId, (err, team) => {
        team.announcements.unshift(req.body);
        team.save();
        res.redirect(`/announcements/${team.id}`);
    })
}
function deleteAnnouncement(req, res, next) {
    Teams.findById(req.user.teamId, (err, team) => {
        let targetIdx;
        team.announcements.forEach((a, idx) => {
            if (a.id === req.params.id) {
                targetIdx = idx;
            }
        });
        team.announcements.splice(targetIdx, 1);
        team.save();
        res.redirect(`/announcements/${team.id}`);
    })
}

function showAnnouncement(req, res, next) {
    Teams.findById(req.user.teamId).populate('players').exec((err, team) => {
        let targetIdx;
        team.announcements.forEach((post, idx) => {
            if (post.id === req.params.id) {
                targetIdx = idx;
            }
        });
        Players.findById(req.user.id, (err, player) => {
            let user = player;
            res.render('teams/announcement', {
                user,
                team,
                post: team.announcements[targetIdx]
            })
        })

    })
}


function showMatch(req, res, next) {
    Teams.findById(req.params.id, (err, team) => {
        res.render('teams/match', {
            user: req.user,
            team,
        })
    })
}

function createMatch(req, res, next) {
    Teams.findById(req.user.teamId, (err, team) => {
        team.matches.unshift(req.body);
        team.save();
        console.log(`match created!!!`);
        res.redirect(`/matches/${team.id}`);
    })
}
function deleteMatch(req, res, next) {
    Teams.findById(req.user.teamId, (err, team) => {
        let targetIdx;
        team.matches.forEach((m, idx) => {
            if (m.id === req.params.id) {
                targetIdx = idx;
            }
        });
        team.matches.splice(targetIdx, 1);
        team.save();
        res.redirect(`/matches/${team.id}`);
    })
}

function createComment(req, res, next) {
    Teams.findById(req.user.teamId, (err, team) => {
        let targetIdx;
        team.announcements.forEach((a, idx) => {
            if (a.id === req.params.id) {
                targetIdx = idx;
            }
        });
        console.log(team.announcements[targetIdx].id);
        req.body.author = req.user.name;
        team.announcements[targetIdx].comments.unshift(req.body);
        team.save();
        res.redirect(`/announcements/${team.id}`);

    })
}

function newLogo(req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, (error, fields, files) => {
        fs.writeFileSync(`public/images/teams-avatar/${files.upload.name}`, fs.readFileSync(files.upload.path));
        Teams.findById(req.user.teamId, (err, team) => {
            team.logo = `/images/teams-avatar/${files.upload.name}`;
            team.save();
        })
        res.redirect(`/teams/${req.user.teamId}`);
    });
}