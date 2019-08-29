var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    time: {
        type: Date,
        required: true,
        default: () => {
            var now = new Date;
            return now.toLocaleString();
        }
    },
    text: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
});

var announcementSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: () => { return new Date; }
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
    address: {
        type: String,
        required: true
    }
});

var teamSchema = new Schema({
    logo: String,
    location: String,
    name: String,
    leader: String,
    players: [{
        type: Schema.Types.ObjectId,
        ref: 'Player'
    }],
    description: {
        type: String,
        required: true
    },
    matches: [matchSchema],
    foundDate: {
        type: String,
        default: () => {
            var today = new Date;
            return today.toLocaleString();
        }
    },
    announcements: [announcementSchema],
}, {
        timestamps: true
});

module.exports = mongoose.model('Team', teamSchema);