var Members = require('../models/member');
var Teams = require('../models/team');

module.exports = {
    index,
    showManagerTeam,
    showPlayerTeam,
    joinTeam,
    editMember,
    updateMember,
    leaveTeam,
    deleteTeam,
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
    // if(team.players.includes(req.user.id)){
    //   return res.redirect('/teams/list');
    // };
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

function leaveTeam(req, res, next) {
  Teams.findById(req.params.id, (err, team)=>{
    team.players.forEach((player, idx)=>{
      if(player == req.user.id){
        team.players.splice(idx, 1);
      }
    })
    team.save();
    Members.findById(req.user.id, (err, member)=>{
      member.joinTeam.forEach((t, idx)=>{
        console.log(typeof t);
        if(t == team.id){
          member.joinTeam.splice(idx, 1);
        }
      })
      member.save();
      // res.json(member);
      res.redirect('/members/player');
    })
  })
  // let user = req.user;
  //   Teams.findById(req.params.id, (err, team)=>{
  //     let targetIdx;
  //     team.players.forEach((p, idx)=>{
  //       if(p === user.id){
  //         targetIdx = idx;
  //       }
  //     })
  //     team.players.splice(targetIdx, 1);
  //     team.save();
  //     Members.findById(req.user.id, (err, member)=>{
  //       let index;
  //       member.joinTeam.forEach((t, idx)=>{
  //         if(t === req.params.id){
  //           index = idx;
  //         }
  //       })
  //       member.joinTeam.splice(index, 1);
  //       member.save();
  //       res.redirect('/members/player');
  //     })
  //   }) 
  };


function deleteTeam(req, res, next) {
  Members.findById(req.user.id, (err, member)=>{
    member.ownTeam.forEach((t, idx)=>{
      if(t == req.params.id){
        member.ownTeam.splice(idx, 1);
      }
    });
    member.save();
    Teams.findByIdAndDelete(req.params.id).populate((err, team)=>{
      team.players.forEach((player, idx)=>{
        res.json(player);
    //   model.find(player, (err, docs)=>{
    //      console.log(player);
    //      res.json(player);
    // });
  })

      // team.players.forEach((playerId, idx)=>{
      //   if(playerId == req.user.id){
      //     team.players.splice(idx, 1);
      //   }
      // })
      // if(team.players && team.players.length){
      //   Members.findById(team.players[0], (err, secondMember)=>{
      //     secondMember.ownTeam.push(team.id);
      //     team.leader = secondMember.eventNames;
      //     secondMember.save();
      //     team.save();
      // res.redirect('/members/manager');

      //   })
      // }else{
      //   Teams.findOneAndDelete(req.params.id, (err, targetTeam)=>{
      //     res.redirect('/members/manager');
            
        // })
      // };

    })

  })
}





// function allPlayers(req, res, next) {
//   Players.find({}, (err, players)=>{
//       res.render('players/all', {
//           players
//       })
//   })
// }

