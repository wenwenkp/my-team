var Teams = require('../models/team');
var Members = require('../models/member');

module.exports = {
    // index,
    newTeam,
    createTeam,
    showTeam,
    showTeamPlayers,
    showTeamSchedule,
    showAllTeams,
    editTeam,
    updateTeam,
    // createAnnouncement,
    // deleteAnnouncement,
    // showAnnouncement,
    createSchedule,
    deleteSchedule,
    // createComment,
    // allTeams,
};


// function index(req, res, next) {
//     Teams.find({}, (err, teams)=>{
//         res.render('teams/index', {
//             user: req.user,
//             teams
//         })
//     })
// }
function newTeam(req, res, next) {
    let options = ['1-10', '20-40', 'After 40'];
    res.render('teams/new', {
        user: req.user,
        options
    });
}
function createTeam(req, res, next) {
    var newTeam = new Teams(req.body);
    newTeam.save();
    newTeam.players.push(req.user._id);
    newTeam.leader = req.user.name;
    newTeam.save();

    Members.findById(req.user.id, (err, member)=>{
        // member.joinTeam.push(newTeam.id);
        member.ownTeam.push(newTeam.id);
        member.isLeader = true;
        member.save();
        res.redirect('/members/manager');
        // res.render('players/index', {
        //     user: p,
        //     team:newTeam
        // })
    })
}
function showTeam(req, res, next) {
    Teams.findById(req.params.id).populate('players').exec((err, team)=>{
        Members.findById(req.user._id, (err, member)=>{
            let leader =false;
            let teammate = false;
            if(member.ownTeam.includes(team.id)){
                leader = true;
            };
            if(member.joinTeam.includes(team.id)){
                teammate = true;
            }
        res.render('teams/show', {
            user: req.user,
            team,
            member,
            leader,
            teammate
        })
        })
    })
}
function showTeamPlayers(req, res, next) {
    Teams.findById(req.params.id).populate('players').exec((err, team)=>{
        // Members.findById(req.user.id, (err, member)=>{
        //     let leader =false;
        //     let teammate = false;
        //     if(member.ownTeam.includes(team.id)){
        //         leader = true;
        //     };
        //     if(member.joinTeam.includes(team.id)){
        //         teammate = true;
        //     }
        res.render('teams/showPlayers', {
            user: req.user,
            team,
        })
        
    })
}
function showTeamSchedule(req, res, next) {
    Teams.findById(req.params.id).populate('players').exec((err, team)=>{
        Members.findById(req.user.id, (err, member)=>{
            let leader =false;
            let teammate = false;
            if(member.ownTeam.includes(team.id)){
                leader = true;
            };
            if(member.joinTeam.includes(team.id)){
                teammate = true;
            }
        res.render('teams/showSchedule', {
            user: req.user,
            team,
            member,
            leader,
            teammate
        })
        // res.json(team);
        })
    })
}

function showAllTeams(req, res, next) {
    Teams.find({}, (err, teams)=>{
        // Members.findById(req.user.id, (err, member)=>{
        // let filteredTeams = [];
        // teams.forEach((team, idx)=>{
        //     if(!member.joinTeam.includes(team.id)){
        //         filteredTeams.push(team);
        //     }
        // })
        res.render('teams/list', {
            user: req.user,
            teams,
            // member
        });
    // })
    })
}


function editTeam(req, res, next) {
    Teams.findById(req.params.id, (err, team)=>{
        let options = ['1-10', '20-40', 'After 40'];
        ;
    res.render('teams/edit', {
        user: req.user,
        team,
        options
    })
})

}

function updateTeam(req, res, next) {
    Teams.findByIdAndUpdate(req.params.id, req.body).populate('players').exec((err, team)=>{
        res.redirect(`/teams/${team.id}`)
    })
}

// function createAnnouncement(req, res, next) {
//     Teams.findById(req.user.teamId).populate('players').exec((err, team)=>{
//         team.announcements.push(req.body);
//         team.save();
//         res.redirect(`/teams/${team.id}`);
//         // res.render('teams/show', {
//         //     user: req.user,
//         //     team
//         // });
//     })
// }
// function deleteAnnouncement(req, res, next) {
//     Teams.findById(req.user.teamId).populate('players').exec((err, team)=>{
//         let targetIdx;
//         team.announcements.forEach((a, idx)=>{
//             if(a.id === req.params.id){
//                 targetIdx = idx;
//             }
//         });
//         team.announcements.splice(targetIdx, 1);
//         team.save();
//         res.redirect(`/teams/${team.id}`);
//         // res.render('teams/show', {
//         //     user: req.user,
//         //     team
//         // })
//     })
// }

// function showAnnouncement(req, res, next) {
//     Teams.findById(req.user.teamId, (err, team)=>{
//         let targetIdx;
//         team.announcements.forEach((post, idx)=>{
//             if(post.id === req.params.id){
//                 targetIdx = idx;
//             }
//         });
//         res.render('teams/announcement', {
//             user: req.user,
//             team,
//             post: team.announcements[targetIdx]
//         })
//     })
// }

function createSchedule(req, res, next) {
    Teams.findById(req.params.id).populate('players').exec((err, team)=>{
        team.matches.push(req.body);
        team.save();
        res.redirect(`/teams/${team.id}/schedule`);
        // res.render('teams/show', {
        //     user: req.user,
        //     team
        // });
    })
}
function deleteSchedule(req, res, next) {
    Teams.findById(req.params.id).populate('players').exec((err, team)=>{
        let targetIdx;
        team.matches.forEach((m, idx)=>{
            if(m.id === req.params.id){
                targetIdx = idx;
            }
        });
        team.matches.splice(targetIdx, 1);
        team.save();
        res.redirect(`/teams/${team.id}/schedule`);
        // res.render('teams/show', {
        //     user: req.user,
        //     team
        // })
    })
}

// function createComment(req, res, next) {
//     Teams.findById(req.user.teamId, (err, team)=>{
//         let targetIdx;
//         team.announcements.forEach((a, idx)=>{
//             if(a.id === req.params.id){
//                 targetIdx = idx;
//             }
//         });
//         req.body.author = req.user.name;
//         team.announcements[targetIdx].comments.push(req.body);
//         team.save();
//         res.redirect(`/teams/announcements/${team.announcements[targetIdx]._id}`);
//         // res.render('teams/announcement', {
//         //     user: req.user,
//         //     team,
//         //     post: team.announcements[targetIdx]
//         // })
//     })
// }

// function allTeams(req, res, next) {
//     Teams.find({}, (err, teams)=>{
//         res.render('teams/all', {
//             teams
//         })
//     })
// }