var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playerSchema = new Schema({
    name: String,
    googleId: String,
    avatar: String,
    favPosition: String,
    favTeam: String,
    leader: {
        type: Boolean,
        default: false
    },
    team:{
        type: Schema.Types.ObjectId, 
        ref: 'Team'
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Player', playerSchema);