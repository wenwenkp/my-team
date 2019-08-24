var Players = require('../models/player');
var Teams = require('../models/team');

module.exports = {
    index,
    editPlayer,
    updatePlayer,
    leaveTeam,
}

function index(req, res, next) {
      Teams.findById(req.user.teamId)
    .populate('players')
    .exec((err, team)=>{
      res.render('players/index', {
        user: req.user,
        team,
      })
    })
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
  res.json(req.user);
}


