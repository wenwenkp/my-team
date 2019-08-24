var Players = require('../models/player');
var Teams = require('../models/team');

module.exports = {
    index,
    updateTeam,
    leaveTeam,
}

function index(req, res, next) {
    // console.log(req.body);
    // // Make the query object to use with Student.find based up
    // // the user has submitted the search form or now
    // let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
    // // Default to sorting by name
    // // let sortKey = req.query.sort || 'name';
    Players.findById(req.user.id, function(err, player) {
      // console.log(req.user);
    // if (err) return next(err);
    // Passing search values, name & sortKey, for use in the EJS
    res.render('players/index', { 
      player, 
      user: req.user,
      // name: req.query.name, 
    });
  });
}
function updateTeam (req, res, next) {
  Players.findById(req.user.id, (err, player)=>{
    player.team = req.body.teamId,
    player.save((err)=>{
      if(err) {
        console.log(err);
      };
    })
    Teams.findById(req.body.teamId, (err, team)=>{
      team.players.push(player.id);
      team.save((err)=>{
        if(err){
          console.log(err);
        }
        res.render('players/index', {
          user: req.user,
          team,
          player
        })
      })
    })
  });
}
function leaveTeam(req, res, next) {
  console.log(req.body);
  Players.findById(req.body.playerId, (err, player)=>{
    player.team = null;
    player.save();
  });
  Teams.findById(req.body.teamId, (err, team)=>{
    let idx = team.players.indexOf(req.body.playerId);
    team.players.splice(idx, 1);
    team.save();
    res.json(team);
  });
}