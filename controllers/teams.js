var Teams = require('../models/team');
var Players = require('../models/player');

module.exports = {
    index,
    newTeam,
    createTeam,
    showTeam,
    editTeam,
    updateTeam,
    createAnnouncement,
    deleteAnnouncement,
    showAnnouncement,
    showMatch,
    createMatch,
    deleteMatch,
    createComment,
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
        res.redirect('/players');
        // res.render('players/index', {
        //     user: p,
        //     team:newTeam
        // })
    })
}

function showTeam(req, res, next) {
    Teams.findById(req.params.id).populate('players').exec((err, team)=>{
        console.log(req.params.id);
        res.render('teams/show', {
            user: req.user,
            team,
        })
    })
}

function editTeam(req, res, next) {
    res.render('teams/edit', {
        user: req.user
    })
}

function updateTeam(req, res, next) {
    Teams.findByIdAndUpdate(req.params.id, req.body).populate('players').exec((err, team)=>{
        res.redirect(`/teams/${team.id}`)
    })
}

function createAnnouncement(req, res, next) {
    Teams.findById(req.user.teamId).populate('players').exec((err, team)=>{
        team.announcements.push(req.body);
        team.save();
        res.redirect(`/teams/${team.id}`);
        // res.render('teams/show', {
        //     user: req.user,
        //     team
        // });
    })
}
function deleteAnnouncement(req, res, next) {
    Teams.findById(req.user.teamId).populate('players').exec((err, team)=>{
        let targetIdx;
        team.announcements.forEach((a, idx)=>{
            if(a.id === req.params.id){
                targetIdx = idx;
            }
        });
        team.announcements.splice(targetIdx, 1);
        team.save();
        res.redirect(`/teams/${team.id}`);
        // res.render('teams/show', {
        //     user: req.user,
        //     team
        // })
    })
}

function showAnnouncement(req, res, next) {
    Teams.findById(req.user.teamId, (err, team)=>{
        let targetIdx;
        team.announcements.forEach((post, idx)=>{
            if(post.id === req.params.id){
                targetIdx = idx;
            }
        });
        res.render('teams/announcement', {
            user: req.user,
            team,
            post: team.announcements[targetIdx]
        })
    })
}


function showMatch(req, res, next) {
    Teams.findById(req.params.id, (err, team)=>{
        res.render('teams/match', {
            user: req.user,
            team,
        })
    })
}

function createMatch(req, res, next) {
    Teams.findById(req.user.teamId, (err, team)=>{
        team.matches.push(req.body);
        team.save();
        console.log(`match created!!!`);
        res.redirect(`/matches/${team.id}`);
        // res.render('teams/show', {
        //     user: req.user,
        //     team
        // });
    })
}
function deleteMatch(req, res, next) {
    Teams.findById(req.user.teamId, (err, team)=>{
        let targetIdx;
        team.matches.forEach((m, idx)=>{
            if(m.id === req.params.id){
                targetIdx = idx;
            }
        });
        team.matches.splice(targetIdx, 1);
        team.save();
        res.redirect(`/matches/${team.id}`);
        // res.render('teams/show', {
        //     user: req.user,
        //     team
        // })
    })
}

function createComment(req, res, next) {
    Teams.findById(req.user.teamId, (err, team)=>{
        let targetIdx;
        team.announcements.forEach((a, idx)=>{
            if(a.id === req.params.id){
                targetIdx = idx;
            }
        });
        req.body.author = req.user.name;
        team.announcements[targetIdx].comments.push(req.body);
        team.save();
        res.redirect(`/teams/announcements/${team.announcements[targetIdx]._id}`);
        // res.render('teams/announcement', {
        //     user: req.user,
        //     team,
        //     post: team.announcements[targetIdx]
        // })
    })
}