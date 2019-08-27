var Members = require('../models/member');
var Teams = require('../models/team');

module.exports = {
    index,
    showManagerTeam,
    showPlayerTeam,
    joinTeam,
    editMember,
    updateMember,
    // leaveTeam,
    // allPlayers,
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
    Members.findById(req.user.id, (err, member)=>{
      res.render('members/index', {
        user: member,
      });
    })
  // }
}
function showManagerTeam(req, res, next) {
  Members.findById(req.user.id).populate('Team').exec((err, member)=>{
    Teams.find({_id: member.ownTeam}).populate('Member')
    .exec((err, teams)=>{
    res.render('members/manager', {
      user:req.user,
      teams,
      member,
      // number
    });
  })

  })
}
function showPlayerTeam(req, res, next) {
  Members.findById(req.user.id).populate('Team').exec((err, member)=>{
    Teams.find({_id: member.joinTeam}).populate('Member')
    .exec((err, teams)=>{
      res.render('members/player', {
        user:req.user,
        teams,
        member
      });
    })
    
  })
}

function joinTeam(req, res, next) {
  Teams.findById(req.body.teamId, (err, team)=>{
    if(team.players.includes(req.user.id)){
      return res.redirect('/teams/list');
    };
    team.players.push(req.user.id);
    team.save();
    Members.findById(req.user.id, (err, member)=>{
      member.joinTeam.push(team.id);      
      member.save();
      res.redirect('/members/player');
    })
  })
}

function editMember(req, res, next) {
  Members.findById(req.params.id, (err, member)=>{
    res.render('members/edit', {
      user: req.user,
      member
    });
  })

}

function updateMember(req, res, next) {
  Members.findById(req.params.id, (err, member)=>{
    member.favTeam = req.body.favTeam;
    member.favPosition = req.body.favPosition;
    member.save();
    res.redirect(`/members`);
    // res.render('players/index',{
    //   user: player
    // });
  });
}

// function leaveTeam(req, res, next) {
//   let user = req.user;
//   if(user.isLeader){
//     Teams.findOneAndDelete(user.teamId).populate('players').exec((err, team)=>{
//       team.players.forEach((p)=>{
//         p.teamId = '';
//         p.save();
//       })
//     })
//   }else{
//     Teams.findById(user.teamId).populate('players').exec((err, team)=>{
//       let targerIdx;
//       team.players.forEach((p, idx)=>{
//         if(p.teamId === user.teamId){
//           targerIdx = idx;
//         }
//       })
//       team.players.splice(targerIdx, 1);
//       team.save();
//       }) 
//   };
//   Players.findById(user.id, (err, p)=>{
//     p.isLeader = false;
//     p.teamId = '';
//     p.save();
//     res.redirect('/players');
// })
// }



// function allPlayers(req, res, next) {
//   Players.find({}, (err, players)=>{
//       res.render('players/all', {
//           players
//       })
//   })
// }

