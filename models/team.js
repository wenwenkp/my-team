var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
    name: String,
    leader: String,
    players:[{
        type: Schema.Types.ObjectId, 
        ref: 'Member'
    }],
    description:{
        type: String,
        required: true
    },
    matches:[matchSchema],
    matchesNumber:{
        type: Number,
        default: 0
    },
    foundDate: {
        type: String,
        default: () => {
            var today = new Date;
            return today.toDateString();
        }
    },
},{
    timestamps: true
});

module.exports = mongoose.model('Team', teamSchema);