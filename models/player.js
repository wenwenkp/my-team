var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playerSchema = new Schema({
    name: String,
    email: String,
    googleId: String,
    avatar: String,
    favPosition: String,
    favTeam: String,
    isLeader: {
        type: Boolean,
        default: false
    },
    teamId: {
        type: String,
        default: ''
    }
}, {
        timestamps: true
});

module.exports = mongoose.model('Player', playerSchema);