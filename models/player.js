var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playerSchema = new Schema({
    name: String,
    googleId: String,
    avatar: String,
    favPosition: String,
    favTeam: String,
    isLeader: {
        type: Boolean,
        default: false
    },
    teamId: String
},{
    timestamps: true
});

module.exports = mongoose.model('Player', playerSchema);