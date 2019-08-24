var Players = require('../models/player');
var Teams = require('../models/team');

module.exports = {
    index,
    editPlayer,
    updatePlayer,
    leaveTeam,
}

function index(req, res, next) {
    Players.findById(req.user.id, (err, player)=> {
      Teams.findById(player.teamId)
    .populate('players')
    .exec((err, team)=>{
      res.render('players/index', {
        user: player,
        team,
        player
      })
    })
  });
}
function editPlayer(req, res, next) {
  Players.findById(req.params.id, (err, player)=>{
    res.render('players/edit', {
      player,
      user: player
    });

  })
}

function updatePlayer(req, res, next) {
  Players.findById(req.params.id, (err, player)=>{
    player.favTeam = req.body.favTeam;
    player.favPosition = req.body.favPosition;
    player.save();
    res.redirect('/players');
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


