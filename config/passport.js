var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var Player = require('../models/player');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientScrect: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
},
    function(accessToken, refreshToken, profile, cb) {
        Player.findOne({'googleId':profile.id}, (err, player)=> {
            if(err) return cb(err);
            if(player) {
                return cb(null, player);
            }else{
                var newPlayer = new Player({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    googleId: profile.id
                });
                newPlayer.save((err)=>{
                    if(err) return cb(err);
                    return cb(null, player);
                })
            }
        });
    }
));

passport.serializeUser((player, done)=>{
    done(null, player.id);
});

passport.deserializeUser((id, done)=>{
    Player.findById(id, (err, player)=>{
        done(err, player);
    });
});
