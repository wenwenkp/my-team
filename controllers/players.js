var Players = require('../models/player');
var Teams = require('../models/team');

module.exports = {
    index,
    editPlayer,
    updatePlayer,
    leaveTeam,
    joinTeam,
}

function index(req, res, next) {
  if(req.user.teamId) {
    Teams.findById(req.user.teamId)
    .populate('players')
    .exec((err, team)=>{
      res.render('players/index', {
        user: req.user,
        team,
      })
    })
  }else{
    Players.findById(req.user.id, (err, player)=>{
      res.render('players/index', {
        user: req.user,
      });
    })
  }
      
}
function editPlayer(req, res, next) {
    res.render('players/edit', {
      user: req.user
    });
}

function updatePlayer(req, res, next) {
  Players.findById(req.user._id, (err, player)=>{
    player.favTeam = req.body.favTeam;
    player.favPosition = req.body.favPosition;
    player.save();
    res.redirect('/players');
  });
}

function leaveTeam(req, res, next) {
  let user = req.user;
  if(user.isLeader){
    Teams.findOneAndDelete(user.teamId).populate('players').exec((err, team)=>{
      team.players.forEach((p)=>{
        p.teamId = '';
      })
      team.players = [];
      team.save();
    })
  }else{
    Teams.findById(user.teamId).populate('players').exec((err, team)=>{
      let targerIdx;
      team.players.forEach((p, idx)=>{
        if(p.teamId === user.teamId){
          targerIdx = idx;
        }
      })
      team.players.splice(targerIdx, 1);
      team.save();
      }) 
  };
  Players.findById(user.id, (err, p)=>{
    p.isLeader = false;
    p.teamId = '';
    p.save();
    res.redirect('/players');
})
}

function joinTeam(req, res, next) {
  Teams.findById(req.body.teamId, (err, team)=>{
    team.players.push(req.user.id);
    team.save();
    Players.findById(req.user.id, (err, p)=>{
      p.teamId = team.id;
      p.save();
      res.redirect('/players');
    })
  })
}


