var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var Member = require('../models/member');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
},
    function(accessToken, refreshToken, profile, cb) {
        Member.findOne({'googleId':profile.id}, (err, member)=>{
            if(err) return cb(err);
            if(member) {
                if (!member.avatar) {
                    member.avatar = profile.photos[0].value;
                    member.save((err)=>{
                    return cb(null, member);
                    });
                }else{
                    return cb(null, member);
                }
            }else{
                var newMember = new Member({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    googleId: profile.id
                });
                newMember.save((err)=>{
                    if(err) return cb(err);
                    return cb(null, member);
                })
            }
        });
    }
));

passport.serializeUser((member, done)=>{
    done(null, member.id);
});

passport.deserializeUser((id, done)=>{
    Member.findById(id, (err, member)=>{
        done(err, member);
    });
});
