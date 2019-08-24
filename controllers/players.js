var Players = require('../models/player');
var Teams = require('../models/team');

module.exports = {
    index,
    showTeam,
    newTeam,
    createTeam,
    leaveTeam,
}

function index(req, res, next) {
    Players.findById(req.user.id, (err, player)=> {
      Teams.findById(player.teamId, (err, team)=>{
        res.render('players/index', {
          user:req.user,
          player,
          team,
        })
      })
  });
}
function showTeam(req, res, next) {
  Players.findById(req.params.id, (err, player)=>{
    Teams.findById(player.teamId)
    .populate('players')
    .exec((err, team)=>{
      res.render('players/team', {
        user: player,
        team,
        player
      })
    })
  });
}
function leaveTeam(req, res, next) {
  Players.findById(req.user.id, (err, player)=>{
    if(player.isLeader){
      Teams.findByIdAndDelete(player.teamId, (err, team)=>{
        if(err)
        console.log(err);
      })
    }else{
      Teams.findById(player.teamId)
      .populate('players')
      .exec((err, team)=>{
        let idx = team.players.indexOf(player.teamId);
        team.players.splice(idx, 1);
      })
    };
    player.teamId = '';
    player.isLeader = false;
    player.save();
    res.redirect('/players');
  });
}

function newTeam(req, res, next) {
  res.render('players/new',{
    user: req.user,
    playerId: req.user.id
  });
}

function createTeam(req, res, next) {
  var team = new Teams(req.body);
  Players.findById(req.body.playerId, (err, player) => {
      player.teamId = team.id;
      player.isLeader = true;
      team.players.push(player.id);
      team.leader = player.name;
      team.save((err)=>{});
      player.save((err)=>{});
      res.render('players/index', {
        player,
        team,
        user: player
      });
  })
}
