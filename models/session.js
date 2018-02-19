var mongoose = require('mongoose');

var sessionSchema = mongoose.Schema({
    date: {type: String},
    child: {type: mongoose.Schema.Types.ObjectId, ref: 'Child'},
    therapist: {type: mongoose.Schema.Types.ObjectId, ref: 'Therapist'},
    audio: {type: Boolean, default: false},
    questions: [mongoose.Schema.Types.Mixed],
    isDone: {type: Boolean, default: false}
});

var sessionModel = mongoose.model('Session', sessionSchema);

module.exports = sessionModel;