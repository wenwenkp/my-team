var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    time: {
        type: Date,
        default: () => {return new Date;}
    }
});

var announcementSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: () => {return new Date;}
    },
    content: {
        type: String,
        required: true
    },
    comments: [commentSchema]
});

var matchSchema = new Schema({
    team: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    Address: {
        type: String,
        required: true
    }
});

var teamSchema = new Schema({
    name: String,
    leader: String,
    players:[{
        type: Schema.Types.ObjectId, 
        ref: 'Player'
    }],
    matches:[matchSchema],
    foundDate: {
        type: Date,
        default: () => { return new Date;}
    },
    announcements:[announcementSchema],
},{
    timestamps: true
});

module.exports = mongoose.model('Team', teamSchema);