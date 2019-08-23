var router = require('express').Router();
var playersCtrl = require('../controllers/players');

// GET /players
router.get('/players', isLoggedIn, playersCtrl.index);

// POST /facts
// We will already have access to the logged in player on
// the server, therefore do not use: /players/:id/facts
// router.post('/facts', isLoggedIn, playersCtrl.addFact);

// DELETE /facts/:id
// router.delete('/facts/:id', playersCtrl.delFact);


// Insert this middleware for routes that require a logged in user
function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
  }

module.exports = router;
