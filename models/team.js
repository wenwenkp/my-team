var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    time: {
        type: Date,
        default: () => {return new Date;}
    }
});

var postSchema = new Schema({
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

var teamSchema = new Schema({
    name: String,
    leader: String,
    players:[{
        type: Schema.Types.ObjectId, 
        ref: 'Player'
    }],
    matches:[{
        type: Schema.Types.ObjectId,
        ref: 'Match'
    }],
    foundDate: {
        type: Date,
        default: () => { return new Date;}
    },
    posts:[postSchema],
},{
    timestamps: true
});

module.exports = mongoose.model('Team', teamSchema);