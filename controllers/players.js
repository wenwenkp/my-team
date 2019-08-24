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