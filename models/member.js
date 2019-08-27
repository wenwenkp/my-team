var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var memberSchema = new Schema({
    name: String,
    googleId: String,
    avatar: String,
    email:String,
    favPosition: String,
    favTeam: String,
    isLeader: {
        type: Boolean,
        default: false
    },
    ownTeam:[{        
        type: Schema.Types.ObjectId, 
        ref: 'Team'
    }],
    joinTeam: [{
        type: Schema.Types.ObjectId,
        ref:'Team'
    }]
},{
    timestamps: true
});

module.exports = mongoose.model('Member', memberSchema);