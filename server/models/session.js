var mongoose = require('mongoose');

var sessionSchema = mongoose.Schema({
    username: {type: String},
    name: {type: String},
    surname: {type: String},
    sessions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Session'}]
});

var sessionModel = mongoose.model('Session', sessionSchema);

module.exports = sessionModel;