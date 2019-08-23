var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    gogoleId: String,
    avatar: String,
    favPosition: String,
    favTeam: String,
    leader: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);