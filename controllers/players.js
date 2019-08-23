var Players = require('../models/player');

module.exports = {
    index,
}

function index(req, res, next) {
    // console.log(req.body);
    // // Make the query object to use with Student.find based up
    // // the user has submitted the search form or now
    // let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
    // // Default to sorting by name
    // // let sortKey = req.query.sort || 'name';
    Players.find({}, function(err, players) {
      console.log(req.user);
      console.log(players);
    // if (err) return next(err);
    // Passing search values, name & sortKey, for use in the EJS
    res.render('players/index', { 
      players, 
      user: req.user,
      name: req.query.name, 
    });
  });
}