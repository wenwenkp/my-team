var Teams = require('../models/team');
var Players = require('../models/player');

module.exports = {
    index,
    newTeam,
    createTeam,
}

function index(req, res, next) {
    // console.log(req.body);
    // // Make the query object to use with Student.find based up
    // // the user has submitted the search form or now
    // let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
    // // Default to sorting by name
    // // let sortKey = req.query.sort || 'name';
    Players.findById(req.user.id, (err, player)=>{
      // console.log(req.user);
      console.log(player.team);
    //   if(player.team) {
    //     res.json(player.team);
    //   }else{
        res.render('teams/index', {
            player,
            user: req.user,
            playerTeam: player.team
        })
    //   }
    // if (err) return next(err);
    // Passing search values, name & sortKey, for use in the EJS
      // name: req.query.name, 
    });
}

function newTeam(req, res, next) {
    Players.findById(req.user.id, (err, player)=>{
        res.render('teams/new', {
            player,
            user: req.user
        });
    })
}
function createTeam(req, res, next) {
    var team = new Teams(req.body);
    team.save((err)=>{
        if(err) {
            console.log(err);
        };
    });
    Players.findById(req.user.id, (err, player) => {
        player.team = team.id;
        player.save((err)=>{
            if(err){
                console.log(err);
            };
            res.render('teams/index', {
                player,
                team,
                user: req,user
            });
        })
    });
    // Players.findById(req.user.id, (err, player)=>{
    //     res.render('teams/new', {
    //         player,
    //         user: req.user
    //     });
    // })
}