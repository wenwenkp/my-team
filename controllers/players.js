var Players = require('../models/player');
var Teams = require('../models/team');
var formidable = require("formidable");
var fs = require("fs");

module.exports = {
    index,
    editPlayer,
    updatePlayer,
    leaveTeam,
    joinTeam,
    newAvatar,
}

function index(req, res, next) {
  // if(req.user.teamId) {
  //   Teams.findById(req.user.teamId)
  //   .populate('players')
  //   .exec((err, team)=>{
  //     res.render('players/index', {
  //       user: req.user,
  //       team,
  //     })
  //   })
  // }else{
    Players.findById(req.user.id, (err, player)=>{
      res.render('players/index', {
        user: player,
      });
    })
  // }
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
    res.redirect(`/players`);
    // res.render('players/index',{
    //   user: player
    // });
  });
}

function leaveTeam(req, res, next) {
  let user = req.user;
  if(user.isLeader){
    Teams.findOneAndDelete(user.teamId).populate('players').exec((err, team)=>{
      team.players.forEach((p)=>{
        p.teamId = '';
        p.save();
      })
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

function newAvatar(req, res, next) {
  var form = new formidable.IncomingForm();
  form.parse(req, function(error, fields, files) {
      fs.writeFileSync(`public/images/players-avatar/${files.upload.name}`, fs.readFileSync(files.upload.path));
      Players.findById(req.user.id, (err, player)=>{
        player.avatar = `/images/players-avatar/${files.upload.name}`;
        player.save();
      })
      res.redirect('/players') ;
  });
}


