var Teams = require('../models/team');
var Players = require('../models/player');

module.exports = {
    index,
}

function index(req, res, next) {
    Teams.find({}).populate('players').exec((err, teams)=>{
        console.log(teams);
        res.render('teams/index', {
            user: req.user,
            teams,
        })
    });
}
